import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { addUserToStorage, removeUserFromStorage } from "../service/usersInLocalStorage";
import UserApi from "../api/UserApi";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [storedUsers, setStoredUsers] = useState([])
    const [hasStoragedUser, setHasStoragedUser] = useState(false)

    //Logged User State
    const [user, setUser] = useState(null)

    const logInUser = async (userData) => {
  try {
    const res = await UserApi.signIn(userData);
    const { token, user } = res.data;
    const decoded = jwtDecode(token);

    setUser({
        ...user,
        token
    });
    UserApi.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    addUserToStorage(setStoredUsers, { id: decoded.id, email: userData.email });
    setIsLoggedIn(true);

    return true; //Success
  } catch {
    return false; //Fail
  }
}

    const logOutUser = () => {
        setUser(null);
        setIsLoggedIn(false);
        delete UserApi.api.defaults.headers.common['Authorization']
    }

    const deleteUser = async (userId) => {
        try {
            await UserApi.delete(userId);
            // Find deleted user in current State
            setStoredUsers(prev => {
                const updated = prev.filter(u => u.id !== userId);
                localStorage.setItem('sphereOne-users', JSON.stringify(updated))
                return updated;
            });

            // If deleted User was logged in
            if (user?.id === userId) {
                setUser(null);
                setIsLoggedIn(false);
                delete UserApi.defaults.headers.common['Authorization'];
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    };

    useEffect(() => {
        const savedUsers = localStorage.getItem('sphereOne-users');
        if (savedUsers) {
            try {
                const parsed = JSON.parse(savedUsers);
                if (Array.isArray(parsed)) {
                    setStoredUsers(parsed);
                    setHasStoragedUser(parsed.length > 0);
                } else {
                    localStorage.removeItem('sphereOne-users')
                    setStoredUsers([]);
                    setHasStoragedUser(false);
                }
            } catch (error) {
                localStorage.removeItem('sphereOne-users');
                setStoredUsers([]);
                setHasStoragedUser(false)
            }
        }
    }, [])
    
    // If storedUserNames changes, updates hasStoragedUser
    useEffect(() => {
        setHasStoragedUser(storedUsers.length > 0);
    }, [storedUsers]);

    return (
        <UserContext.Provider value={{
            isLoggedIn,
            logInUser,
            logOutUser,
            deleteUser,
            hasStoragedUser,
            storedUsers,
            user
        }}>
            {children}
        </UserContext.Provider>

    );
};

export default UserContext;
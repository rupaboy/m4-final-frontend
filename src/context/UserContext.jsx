import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import UserApi from "../api/UserApi";
import { setRadioToken } from "../api/RadioApi";
import { setCountryToken } from "../api/CountryApi";
import { setUserToken } from "../api/UserApi";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  //Better than useEffect in many cases. Loads localStorage sphereOne-users
  const [storedUsers, setStoredUsers] = useState(() => {
  try {
    const raw = localStorage.getItem('sphereOne-users');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
});
  const [hasStoragedUser, setHasStoragedUser] = useState(false);
  const [logInEmail, setLogInEmail] = useState(null);
  const [user, setUser] = useState(null);

  // LOGIN
const logInUser = async (userData) => {
  try {
    const res = await UserApi.signIn(userData);
    const { token, user: userFromApi } = res.data;
    const decoded = jwtDecode(token);

    const loggedUser = { ...userFromApi, token, id: decoded.id };
    setUser(loggedUser);
    UserApi.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setRadioToken(token); // All requests include token
    setCountryToken(token);
    setUserToken(token)

    setIsLoggedIn(true);
    return true;
  } catch {
    return false;
  }
};

  // LOGOUT
  const logOutUser = () => {
    setUser(null);
    setIsLoggedIn(false);
    delete UserApi.api.defaults.headers.common['Authorization'];
  };

  // DELETE USER
  const deleteUser = async (userId) => {
    try {
      await UserApi.delete(userId);
      setStoredUsers(prev => {
        const updated = prev.filter(u => u.id !== userId);
        localStorage.setItem('sphereOne-users', JSON.stringify(updated));
        return updated;
      });
      if (user?.id === userId) logOutUser();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

const addStoredUser = (userEmail) => {
  setStoredUsers(prev => {
    if (!prev.includes(userEmail)) {  // prev es array de strings
      const updated = [...prev, userEmail];
      localStorage.setItem('sphereOne-users', JSON.stringify(updated));
      return updated;
    }
    return prev;
  });
};

const removeStoredUser = (userEmail) => {
  setStoredUsers(prev => {
    const updated = prev.filter(e => e !== userEmail);
    localStorage.setItem('sphereOne-users', JSON.stringify(updated));
    return updated;
  });
};

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
      logInEmail,
      setLogInEmail,
      storedUsers,
      addStoredUser,
      removeStoredUser,
      user,
      setUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

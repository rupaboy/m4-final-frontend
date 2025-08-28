import { useContext } from "react";
import UserContext from '../context/UserContext'

export const UseUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("UseUser debe ser utilizado dentro del UserProvider");
    }

    return context;
};

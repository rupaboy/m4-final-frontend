import { useContext } from "react";
import {NotificationContext} from "../context/NotificationContext";


export const UseNotification = () => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error("UseNotification debe ser utilizado dentro del Notification Provider");
    }

    return context;
};

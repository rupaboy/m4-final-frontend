import { useContext } from "react";
import RadioContext from '../context/RadioContext'

export const UseRadio = () => {
    const context = useContext(RadioContext);

    if (!context) {
        throw new Error("UseRadio debe ser utilizado dentro del RadioProvider");
    }

    return context;
};

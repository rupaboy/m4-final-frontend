import { useContext } from "react";
import UiContext from '../context/UiContext'

export const UseUi = () => {
    const context = useContext(UiContext);

    if (!context) {
        throw new Error("useUi debe ser utilizado dentro del UiProvider");
    }

    return context;
};

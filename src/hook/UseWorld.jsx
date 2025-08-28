import { useContext } from "react";
import { WorldContext } from '../context/WorldContext'


export const UseWorld = () => {
    const context = useContext(WorldContext);

    if (!context) {
        throw new Error("UseWorld debe ser utilizado dentro del WorldProvider");
    }

    return context;
};
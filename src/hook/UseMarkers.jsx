import { useContext } from "react";
import { MarkersContext } from "../context/MarkersContext";


export const UseMarkers = () => {
    const context = useContext(MarkersContext);

    if (!context) {
        throw new Error("UseMarkers debe ser utilizado dentro del Markers Provider");
    }

    return context;
};

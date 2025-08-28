import { useContext } from "react";
import { FetchStatusContext } from '../context/FetchStatusContext'


export const UseFetchStatus = () => {
    const context = useContext(FetchStatusContext);

    if (!context) {
        throw new Error("UseFetchStatus debe ser utilizado dentro del FetchStatus Provider");
    }

    return context;
};

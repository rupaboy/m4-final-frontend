import { createContext, useState, useEffect } from "react";

export const MarkersContext = createContext();
export const MarkersProvider = ({ children }) => {

    const [isMarkersOpen, setIsMarkersOpen] = useState(false)
    const [markers, setMarkers] = useState(() => {
        const savedMarkers = localStorage.getItem('markers');
        return savedMarkers ? JSON.parse(savedMarkers) : [];
    });

    /*const toggleMarkers = () => {
        setIsMarkersOpen(prev => !prev)
    }*/


    const addToMarkers = (currentCountry) => {
        if (!isMarkedAlreadyComparisson(currentCountry)) {
            const updatedMarkers = [...markers, currentCountry]
            setMarkers(updatedMarkers);
            localStorage.setItem('markers', [JSON.stringify(updatedMarkers)]);
        }
    }

    const isMarkedAlreadyComparisson = (marker) => {
        return markers.some((c) => c.code === marker.code)
    };

    const removeFromMarkers = (country) => {
        if (isMarkedAlreadyComparisson(country)) {
            const updatedMarkers = markers.filter((marker) => marker.code !== country.code);
            setMarkers(updatedMarkers);
            localStorage.setItem('markers', JSON.stringify(updatedMarkers));
        }
    };

    const clearMarkers = () => {
    if (window.confirm('You are about to clear all markers except your user location')) {
        setMarkers((prev) => prev.length > 0 ? [prev[0]] : []);
    }
}


    useEffect(() => {
        const storedMarkers = localStorage.getItem('markers');
        if (storedMarkers !== null) {
            setMarkers(JSON.parse(storedMarkers));
        }
    }, [])


    return (
        <MarkersContext.Provider
            value={{
                isMarkersOpen,
                //toggleMarkers,
                addToMarkers,
                removeFromMarkers,
                isMarkedAlreadyComparisson,
                clearMarkers,
                markers,
            }}
        >
            {children}
        </MarkersContext.Provider>
    );

};
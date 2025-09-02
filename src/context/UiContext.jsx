import { createContext, useState } from "react";
import { useLocation } from "react-router";

const UiContext = createContext(); //Contexto de Temas

export const UiProvider = ({ children }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showMarkers, setShowMarkers] = useState(true)
    const [showAdminTools, setShowAdminTools] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [zoom, setZoom] = useState(false);

    const location = useLocation()

    const handleMousePosition = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setPosition({ x, y }); // ahora sí usa la posición real
    };

    const isFinderOpen = location.pathname.startsWith('/finder')
    const isHubOpen = location.pathname.startsWith('/country/')
    const isUserOpen = location.pathname.startsWith('/user')
    const isDashBoardOpen = location.pathname.endsWith('/')

    return (
        <UiContext.Provider value={{
            isMenuOpen,
            setIsMenuOpen,
            showPopUp,
            setShowPopUp,
            handleMousePosition,
            setZoom,
            zoom,
            position,
            isFinderOpen,
            isDashBoardOpen,
            isHubOpen,
            isUserOpen,
            showMarkers,
            setShowMarkers,
            showAdminTools,
            setShowAdminTools
        }}>
            {children}
        </UiContext.Provider>

    );
};

export default UiContext;
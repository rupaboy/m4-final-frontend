import { createContext, useCallback, useRef, useState } from "react";

export const FetchStatusContext = createContext();

export const FetchStatusProvider = ({ children }) => {

    const [statusMap, setStatusMap] = useState({}); // key: fetch name
    const didFetchMap = useRef({});
    const capitalImageMap = useRef({}); // global cache for capital images

    const runFetch = useCallback(async (key, fetchFn, onSuccess) => {
        if (capitalImageMap.current[key]) {
            // Already cached, return immediately
            if (onSuccess) onSuccess(capitalImageMap.current[key]);
            return capitalImageMap.current[key];
        }

        if (didFetchMap.current[key]) return null; // already fetched

        didFetchMap.current[key] = true;
        try {
            const data = await fetchFn();
            setStatusMap(prev => ({
                ...prev, [key]: { dataLoaded: true, fetchFailed: false }
            }));

            if (data) {
                capitalImageMap.current[key] = data; // store in global cache
            }

            if (onSuccess) onSuccess(data);
            return data;

        } catch (error) {
            setStatusMap(prev => ({
                ...prev, [key]: { dataLoaded: false, fetchFailed: true }
            }));
            return null;
        }
    }, []);

    const getStatus = (key) => {
        const { dataLoaded, fetchFailed } = statusMap[key] || {};
        const didFetch = !!didFetchMap.current[key];
        const cachedImage = capitalImageMap.current[key] || null;
        return {
            isLoading: !dataLoaded && !fetchFailed && didFetch,
            hasError: fetchFailed && !dataLoaded && didFetch,
            dataLoaded: !!dataLoaded,
            fetchFailed: !!fetchFailed,
            didFetch,
            cachedImage
        };
    };

    const resetStatus = useCallback((key) => {
        setStatusMap(prev => {
            const newMap = { ...prev };
            delete newMap[key];
            return newMap;
        });
        delete didFetchMap.current[key];
        delete capitalImageMap.current[key];
    }, []);

    return (
        <FetchStatusContext.Provider value={{ runFetch, getStatus, resetStatus, capitalImageMap }}>
            {children}
        </FetchStatusContext.Provider>
    )
}

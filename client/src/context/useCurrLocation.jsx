import { createContext, useContext, useState } from "react";


const CurrLocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [loc, setLoc] = useState('home');
    const [pageName, setPageName] = useState('My Home');
    return <CurrLocationContext.Provider value={{
        loc,
        setLoc,
        pageName,
        setPageName
    }}>
        {children}
    </CurrLocationContext.Provider>
}

export const useCurrLocation = () => {
    return useContext(CurrLocationContext)
}
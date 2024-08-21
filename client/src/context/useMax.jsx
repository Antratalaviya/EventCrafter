import { createContext, useContext, useState } from "react";


const MaxContext = createContext();

export const MaxProvider = ({ children }) => {
    const [active, setActive] = useState(false);
    return <MaxContext.Provider value={{
        active,
        setActive
    }}>
        {children}
    </MaxContext.Provider>
}

export const useMax = () => {
    return useContext(MaxContext)
}
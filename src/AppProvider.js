import { useState, createContext } from "react";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const value = {
        token: [token, setToken],
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider };
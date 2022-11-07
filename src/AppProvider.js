import { useState, createContext } from "react";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);

    const value = {
        token: [token, setToken],
        username: [username, setUsername],
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider };
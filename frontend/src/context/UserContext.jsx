import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Function to update user data
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };
    
    // Function to clear user data (e.g., on logout)
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser && !user) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
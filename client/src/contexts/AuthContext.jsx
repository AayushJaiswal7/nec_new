import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoginPending, setIsLoginPending] = useState(false);
    const [loginError, setLoginError] = useState(null);

    // This is the function your Login.jsx should call
    const setLoginState = (token, userData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser(null);
    };

    // check token validity on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoggedIn(false);
            setUser(null);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                isLoginPending,
                loginError,
                setLoginState,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

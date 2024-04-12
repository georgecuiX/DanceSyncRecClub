import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null); // Provide a default value

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuthenticated: false,
        role: null,
        username: null
    });

    const login = async (username, password, role) => {
        try {
            const response = await fetch(`http://localhost:3001/validate-${role}-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.validation) {
                setUser({
                    isAuthenticated: true,
                    role: data.validation, // Assume this returns 'admin', 'member', or 'coach'
                    username: username
                });
            } else {
                throw new Error('Invalid username or password');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed: ' + error.message);
        }
    };

    const logout = () => {
        setUser({
            isAuthenticated: false,
            role: null,
            username: null
        });
    };

    // Provide setUser in the context for direct manipulation if necessary
    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};



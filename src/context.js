import React, { useState, createContext } from 'react';

export const Context = createContext();

const UserProvider = ({ children }) => {
    const [state, setState] = useState(undefined);

    return (
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    )
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');

    return (
        <Context.Provider value={[theme, setTheme]}>{children}</Context.Provider>
    )
}

export default UserProvider;
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";



interface GlobalContextType {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);


export const CtxProvider = ({children}: {children: ReactNode}) => {

const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"
})

useEffect(() => {
    localStorage.setItem("theme", theme)
},[theme])

    return (
        <GlobalContext.Provider value={{theme, setTheme}}>
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalVar = () => {
    const context = useContext(GlobalContext);
    if (!context) throw new Error("useGlobalVar must be used within CtxProvider");
    return context;
};
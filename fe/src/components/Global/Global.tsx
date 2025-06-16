import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { io, type Socket as SocketType } from "socket.io-client";



interface GlobalContextType {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    isToken: boolean;
    setIsToken: React.Dispatch<React.SetStateAction<boolean>>;
    posts: any[];
    setPosts: React.Dispatch<React.SetStateAction<any[]>>;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);


export const CtxProvider = ({ children }: { children: ReactNode }) => {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light"
    })
    const [isToken, setIsToken] = useState(() => {
        const token = localStorage.getItem("accessToken")
        return !!token
    })

    const [Socket, setSocket] = useState<SocketType | null>(null);
    const [posts, setPosts] = useState<any[]>([])


    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            const socket = io("http://localhost:3000")
            setSocket(socket)
        }
    }, [])

    useEffect(() => {
        if (!Socket) {
            console.log("Socket is Not Connected")
            return
        }
        console.log("Socket is Connected Successfully")

        Socket.emit("get-all-posts", (posts: any) => {
            console.log(posts)
            setPosts(posts.posts)
        })

    }, [Socket])

    return (
        <GlobalContext.Provider value={{ theme, setTheme, setIsToken, isToken, posts, setPosts }}>
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalVar = () => {
    const context = useContext(GlobalContext);
    if (!context) throw new Error("useGlobalVar must be used within CtxProvider");
    return context;
};
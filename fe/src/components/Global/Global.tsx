import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { io, type Socket as SocketType } from "socket.io-client";
import { instance } from "../Instance/Instance";



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

    const [CrruntUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [Socket, setSocket] = useState<SocketType | null>(null);

    const [posts, setPosts] = useState<any[]>([])
    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleCreatePost = async () => {
        const token = localStorage.getItem("accessToken")
        let mediaUrl = ""
        try {
            if (image) {
                const formData = new FormData()
                formData.append("media", image)

                const response = await instance.post("/tasks/upload", formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                console.log(response)
                mediaUrl = response.data.mediaUrl

                if (Socket) {
                    Socket.emit("create-post", {
                        title,
                        content,
                        media: mediaUrl,
                    }, (res: any) => {
                        console.log("Post created:", res);
                    });
                }
            }

        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])

    useEffect(() => {
        if (CrruntUser) {
            localStorage.setItem("user", JSON.stringify(CrruntUser));
        }
    }, [CrruntUser]);

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            const socket = io("http://localhost:3000", {
                auth: {
                    token: localStorage.getItem("accessToken")
                }
            })
            setSocket(socket)
        }
    }, [isToken])

    useEffect(() => {
        if (!Socket) {
            console.log("Socket is Not Connected")
            return
        }
        console.log("Socket is Connected Successfully")

        Socket.on("new-post", (post) => {
            setPosts(prev => [post, ...prev])
        })


        Socket.emit("get-all-posts", (posts: any) => {
            console.log(posts)
            setPosts(Array.isArray(posts) ? posts : posts?.posts || [])
        })


    }, [Socket])

    return (
        <GlobalContext.Provider value={{
            theme,
            setTheme,
            setIsToken,
            isToken,
            posts,
            setPosts,
            handleCreatePost,
            setImage,
            setTitle,
            setContent,
            title,
            content,
            setCurrentUser,
            CrruntUser
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalVar = () => {
    const context = useContext(GlobalContext);
    if (!context) throw new Error("useGlobalVar must be used within CtxProvider");
    return context;
};
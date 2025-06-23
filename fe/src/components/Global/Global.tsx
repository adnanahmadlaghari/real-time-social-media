import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { io, type Socket as SocketType } from "socket.io-client";

import { instance } from "../Instance/Instance";
import { useNavigate } from "react-router-dom";
import Snackbar from "../Alert";



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

    const navigate = useNavigate()
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




    const [MyPosts, setMyPosts] = useState<any[]>([])

    const [image, setImage] = useState<File | null>(null);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState<{ msg: string; severity: "error" | "warning" | "info" | "success" } | null>(null);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(4)
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1)
    const [Next, setNext] = useState(false)
    const [prev, setPrev] = useState(false)
    const [total, setTotal] = useState(0)


    const [IsLoading, setIsLoading] = useState<boolean>(false)

    const handleClose = () => {
        setOpen(false)
    }


    const handleCreatePost = async () => {

        const token = localStorage.getItem("accessToken")
        let mediaUrl = ""
        setIsLoading(true)
        try {
            if (image) {
                const formData = new FormData()
                formData.append("media", image)

                const response = await instance.post("/tasks/upload", formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                // console.log(response)
                mediaUrl = response.data.mediaUrl

                if (Socket) {
                    Socket.emit("create-post", {
                        title,
                        content,
                        media: mediaUrl,
                    }, (res: any) => {
                        setTitle("")
                        setContent("")
                        mediaUrl = ""
                        navigate("/")
                        if (res.success) {

                            setAlert({ msg: "Published", severity: "success" });
                            setOpen(true)
                        }
                        // console.log("Post created:", res);
                    });
                }
            }

        } catch (error) {
            console.log(error)
            setAlert({ msg: error.message || "Something went wrong", severity: "error" });
            setOpen(true)

        } finally {
            setIsLoading(false)
        }
    }

    const handleEditPost = async (id: string) => {
        setIsLoading(true);
        try {
            if (Socket) {
                Socket.emit(
                    "update-post",
                    {
                        id,
                        title,
                        content,
                    },
                    (res: any) => {
                        // console.log("Post update response:", res);

                        if (res.success && res.post) {
                            //  Update in all posts optional i use broadcast to all users then state update there
                            setPosts((prev) =>
                                prev.map((post) =>
                                    post._id === res.post._id ? res.post : post
                                )
                            );

                            //  Update in MyPosts too
                            setMyPosts((prev) =>
                                prev.map((post) =>
                                    post._id === res.post._id ? res.post : post
                                )
                            );

                            setAlert({ msg: "Post Updated", severity: "success" });
                            setOpen(true)
                        }
                    }
                );
            }
        } catch (error) {
            console.log(error);
            setAlert({ msg: error.message || "Something went wrong", severity: "error" });
            setOpen(true)
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeletePost = async (id: string) => {
        setIsLoading(true)
        try {
            if (Socket) {
                Socket.emit("delete-post", id, (res: any) => {
                    if (res.success) {
                        console.log("post Deleted")
                        setMyPosts(prev => prev.filter((post) => post._id !== res.id))
                        setAlert({ msg: "Post Deleted", severity: "success" });
                        setOpen(true)
                    }
                })
            }
        } catch (error) {
            console.log(error)
            setAlert({ msg: error.message || "Something went wrong", severity: "error" });
            setOpen(true)
        } finally {
            setIsLoading(false)
        }
    }

    const handleMyPosts = () => {
        setIsLoading(true)
        try {
            if (Socket) {
                Socket.emit("my-posts", (posts: any) => {
                    setMyPosts(Array.isArray(posts) ? posts : posts?.post || [])
                    // console.log("my posts",posts)
                })
            }
        } catch (error) {
            console.log("error at getting my posts", error)
        } finally {
            setIsLoading(false)
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
        if (!Socket) return;

        Socket.emit("get-all-posts", { page, limit }, (res: any) => {
            if (res.success) {
                setPosts(res.posts);
                setTotalPages(res.totalPages);
                setCurrentPage(res.currentPage);
                setNext(res.hasNextPage);
                setPrev(res.hasPrevPage);
                setTotal(res.total);
            }
        });
    }, [Socket, page, limit]);

    useEffect(() => {
        if (!Socket) {
            console.log("Socket is Not Connected")
            return
        }
        console.log("Socket is Connected Successfully")

        handleMyPosts()

        Socket.on("updated-post", (post) => {
            setPosts(prev => [post, ...prev])
        })

        Socket.on("deleted-post", ({ id }) => {
            setPosts(prev => prev.filter((post) => post._id !== id))
            setTotal(prev => {
                const newTotal = prev - 1;
                setTotalPages(Math.ceil(newTotal / limit)); 
                return newTotal;
            });
        })

        Socket.on("new-post", (post) => {
            setPosts(prev => [post, ...prev])
            setTotal(prev => {
                const newTotal = prev + 1;
                setTotalPages(Math.ceil(newTotal / limit));
                return newTotal;
            });
        })

        return () => {
            Socket.off("new-post");
            Socket.off("updated-post");
            Socket.off("deleted-post");
        };

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
            CrruntUser,
            MyPosts,
            handleEditPost,
            IsLoading,
            handleDeletePost,
            page,
            setPage,
            limit,
            setLimit,
            currentPage,
            setCurrentPage,
            totalPages,
            Next,
            prev,
            setTotal,
            total
        }}>
            {alert && (
                <Snackbar msg={alert.msg} severity={alert.severity} onClose={handleClose} open={open} />
            )}
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalVar = () => {
    const context = useContext(GlobalContext);
    if (!context) throw new Error("useGlobalVar must be used within CtxProvider");
    return context;
};
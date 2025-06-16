import { Box, Grid } from "@mui/material";
import PostCard from "./Card";
import UserProfile from "./UserProfile";
import { useState } from "react";
import CreatePost from "./CreatePost";
import { useGlobalVar } from "./Global/Global";


export const posting = [
    {
        id: 1,
        title: "this is title",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis iste, reprehenderit praesentium nesciunt eos quod eius voluptates, enim obcaecati natus culpa? Explicabo vero tempore ipsum id? Voluptatum, soluta accusamus illo, sed nam sint voluptatem odio quaerat repellat amet error dolor obcaecati minima aut, reiciendis voluptate. Impedit id dignissimos cum facere, fugit consectetur doloremque voluptate dolores esse accusamus placeat hic odio!",
        img: "https://www.famousbirthdays.com/faces/kaya-hazal-image.jpg",
        name: "Adnan Ahmad",
        Date: Date.now()
    },
    {
        id: 2,
        title: "this is title",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis iste, reprehenderit praesentium nesciunt eos quod eius voluptates, enim obcaecati natus culpa? Explicabo vero tempore ipsum id? Voluptatum, soluta accusamus illo, sed nam sint voluptatem odio quaerat repellat amet error dolor obcaecati minima aut, reiciendis voluptate. Impedit id dignissimos cum facere, fugit consectetur doloremque voluptate dolores esse accusamus placeat hic odio!",
        img: "https://www.famousbirthdays.com/faces/kaya-hazal-image.jpg",
        name: "Adnan Ahmad",
        Date: Date.now()
    },
    {
        id: 3,
        title: "this is title",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis iste, reprehenderit praesentium nesciunt eos quod eius voluptates, enim obcaecati natus culpa? Explicabo vero tempore ipsum id? Voluptatum, soluta accusamus illo, sed nam sint voluptatem odio quaerat repellat amet error dolor obcaecati minima aut, reiciendis voluptate. Impedit id dignissimos cum facere, fugit consectetur doloremque voluptate dolores esse accusamus placeat hic odio!",
        img: "https://www.famousbirthdays.com/faces/kaya-hazal-image.jpg",
        name: "Adnan Ahmad",
        Date: Date.now()
    },
    {
        id: 4,
        title: "this is title",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis iste, reprehenderit praesentium nesciunt eos quod eius voluptates, enim obcaecati natus culpa? Explicabo vero tempore ipsum id? Voluptatum, soluta accusamus illo, sed nam sint voluptatem odio quaerat repellat amet error dolor obcaecati minima aut, reiciendis voluptate. Impedit id dignissimos cum facere, fugit consectetur doloremque voluptate dolores esse accusamus placeat hic odio!",
        img: "https://www.famousbirthdays.com/faces/kaya-hazal-image.jpg",
        name: "Adnan Ahmad",
        Date: Date.now()
    },
    {
        id: 5,
        title: "this is title",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis iste, reprehenderit praesentium nesciunt eos quod eius voluptates, enim obcaecati natus culpa? Explicabo vero tempore ipsum id? Voluptatum, soluta accusamus illo, sed nam sint voluptatem odio quaerat repellat amet error dolor obcaecati minima aut, reiciendis voluptate. Impedit id dignissimos cum facere, fugit consectetur doloremque voluptate dolores esse accusamus placeat hic odio!",
        img: "https://www.famousbirthdays.com/faces/kaya-hazal-image.jpg",
        name: "Adnan Ahmad",
        Date: Date.now()
    },
]



const Posts: React.FC = () => {

    const [selectedUser, setSelectedUser] = useState<any | null>(() => {
        const stored = localStorage.getItem("selectedUser");
        return stored ? JSON.parse(stored) : null;
    });

    const {posts} = useGlobalVar()

    const handleUserClick = (_id: string) => {
        const user = posts.find((post) => post._id === _id);
        if (user) {
            setSelectedUser(user);
            localStorage.setItem("selectedUser", JSON.stringify(user));
        }
    };

    const handleBack = () => {
        setSelectedUser(null);
        localStorage.removeItem("selectedUser");
    };

    return (

        <Box sx={{ width: '100vw', height: '100vh',}}>
            <Box>
                <CreatePost />
            </Box>
            {
                selectedUser ? (
                    <UserProfile id={selectedUser.id} onBack={handleBack} />
                ) : (
                    <Grid container spacing={7}  wordwrap="wrap" justifyContent="center" alignItems="center" sx={{ p: 2 }}>
                        {
                            posts.map((post) => {
                                return <Grid key={post._id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <PostCard {...post} handleClick={handleUserClick} />
                                </Grid>
                            })
                        }
                    </Grid>
                )
            }
        </Box>

    );
}

export default Posts
import { Grid } from "@mui/material";
import PostCard from "./Card";
import UserProfile from "./UserProfile";
import { useState } from "react";


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
    const handleUserClick = (id: number) => {
        const user = posting.find((post) => post.id === id);
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

        <>
            {
                selectedUser ? (
                    <UserProfile id={selectedUser.id} onBack={handleBack} />
                ) : (
                    <Grid container spacing={7}  wordWrap="wrap" justifyContent="center" alignItems="center" sx={{ p: 2 }}>
                        {
                            posting.map((post) => {
                                return <Grid key={post.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <PostCard {...post} handleClick={handleUserClick} />
                                </Grid>
                            })
                        }
                    </Grid>
                )
            }
        </>

    );
}

export default Posts
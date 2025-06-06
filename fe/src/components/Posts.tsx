import { Grid } from "@mui/material";
import PostCard from "./Card";


export const posting = [
    {
        title: "this is title",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis iste, reprehenderit praesentium nesciunt eos quod eius voluptates, enim obcaecati natus culpa? Explicabo vero tempore ipsum id? Voluptatum, soluta accusamus illo, sed nam sint voluptatem odio quaerat repellat amet error dolor obcaecati minima aut, reiciendis voluptate. Impedit id dignissimos cum facere, fugit consectetur doloremque voluptate dolores esse accusamus placeat hic odio!",
        img: "https://www.famousbirthdays.com/faces/kaya-hazal-image.jpg",
        name: "Adnan Ahmad",
        Date: Date.now()
    },
    {
        title: "this is title",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis iste, reprehenderit praesentium nesciunt eos quod eius voluptates, enim obcaecati natus culpa? Explicabo vero tempore ipsum id? Voluptatum, soluta accusamus illo, sed nam sint voluptatem odio quaerat repellat amet error dolor obcaecati minima aut, reiciendis voluptate. Impedit id dignissimos cum facere, fugit consectetur doloremque voluptate dolores esse accusamus placeat hic odio!",
        img: "https://www.famousbirthdays.com/faces/kaya-hazal-image.jpg",
        name: "Adnan Ahmad",
        Date: Date.now()
    },
    {
        title: "this is title",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis iste, reprehenderit praesentium nesciunt eos quod eius voluptates, enim obcaecati natus culpa? Explicabo vero tempore ipsum id? Voluptatum, soluta accusamus illo, sed nam sint voluptatem odio quaerat repellat amet error dolor obcaecati minima aut, reiciendis voluptate. Impedit id dignissimos cum facere, fugit consectetur doloremque voluptate dolores esse accusamus placeat hic odio!",
        img: "https://www.famousbirthdays.com/faces/kaya-hazal-image.jpg",
        name: "Adnan Ahmad",
        Date: Date.now()
    },
    {
        title: "this is title",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis iste, reprehenderit praesentium nesciunt eos quod eius voluptates, enim obcaecati natus culpa? Explicabo vero tempore ipsum id? Voluptatum, soluta accusamus illo, sed nam sint voluptatem odio quaerat repellat amet error dolor obcaecati minima aut, reiciendis voluptate. Impedit id dignissimos cum facere, fugit consectetur doloremque voluptate dolores esse accusamus placeat hic odio!",
        img: "https://www.famousbirthdays.com/faces/kaya-hazal-image.jpg",
        name: "Adnan Ahmad",
        Date: Date.now()
    },
    {
        title: "this is title",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis iste, reprehenderit praesentium nesciunt eos quod eius voluptates, enim obcaecati natus culpa? Explicabo vero tempore ipsum id? Voluptatum, soluta accusamus illo, sed nam sint voluptatem odio quaerat repellat amet error dolor obcaecati minima aut, reiciendis voluptate. Impedit id dignissimos cum facere, fugit consectetur doloremque voluptate dolores esse accusamus placeat hic odio!", 
        img: "https://www.famousbirthdays.com/faces/kaya-hazal-image.jpg",
        name: "Adnan Ahmad",
        Date: Date.now()
    },
]
const Posts: React.FC = () => {

  return (
    <Grid>
    {
       posting.map((post, index) => {
        return <PostCard key={index} {...post}/>
       }) 
    }
    </Grid>
  );
}

export default Posts
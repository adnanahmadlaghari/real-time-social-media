const { Server } = require("socket.io");
const Task = require("./models/Task");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // change to your frontend URL
      methods: ["GET", "POST", "PATCH", "DELETE"],
    },
  });


  const createPost = async(payload, callback) => {
   try {
   const {author, title, content} = payload

  const post = await Task.create({
      author,
      title,
      content
    })
    if(callback) callback({success: true, post})
      console.log(post)
   } catch (error) {
     if(callback) callback({success: false, error: error.message})
   }

  }

  io.on("connection", (socket) => {
    console.log("a user is connected");

    socket.on("create-post", createPost)

    socket.on("disconnect", () => {
      console.log("user disconnected ", socket.id);
    });
  });
};

module.exports = setupSocket;

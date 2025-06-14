const { Server } = require("socket.io");

const Task = require("./models/Task");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    },
  });

  const createPost = async (payload, callback) => {
    try {
      const { author, title, content, media } = payload;

      const post = await Task.create({ author, title, content, media });

      io.emit("new-post", post); // broadcast to all
      
      if (callback) callback({ success: true, post });

    } catch (error) {
      if (callback) callback({ success: false, error: error.message });
    }
  };

  const updatePost = async (
    { id, author, title, content, media }, callback ) => {
    try {
      const updatedPost = await Task.findByIdAndUpdate(
        id,
        { author, title, content, media },
        { new: true }
      );
      if (!author || !title || !content) {
        return callback({ success: false, error: "Missing required fields" });
      }

      if (!updatedPost) throw new Error("Post not found");

      io.emit("updated-post", updatedPost);
      if (callback) callback({ success: true, post: updatedPost });

      console.log("Updated:", updatedPost);
    } catch (error) {
      if (callback) callback({ success: false, error: error.message });
    }
  };

  const deletePost = async (id, callback) => {
    try {
      const deletedPost = await Task.findByIdAndDelete(id);

      if (!deletedPost) throw new Error("Post not found");

      io.emit("deleted-post", id);
      if (callback) callback({ success: true, id });

      console.log("Deleted:", deletedPost);
    } catch (error) {
      if (callback) callback({ success: false, error: error.message });
    }
  };

  io.on("connection", (socket) => {
    console.log("a user is connected", socket.id);

    socket.on("get-all-posts", async (callback) => {
      try {
        const posts = await Task.find()
          .populate("author", "firstName lastName username profile")
          .sort({ createdAt: -1 });
        callback({ success: true, posts });
      } catch (err) {
        callback({ success: false, error: err.message });
      }
    });

    socket.on("create-post", createPost);
    socket.on("update-post", updatePost);
    socket.on("delete-post", deletePost);

    socket.on("disconnect", () => {
      console.log("user disconnected ", socket.id);
    });
  });
};

module.exports = setupSocket;

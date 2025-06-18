const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const Task = require("./models/Task");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return new Error("token is missing");

      const decode = jwt.verify(token, process.env.JWT_ACCESS_KEY);

      const user = await User.findById(decode.id);

      if (!user) return new Error("User Not Found");

      socket.user = user;
      next();
    } catch (error) {
      console.error("Socket auth error:", err.message);
      next(new Error("Authentication failed"));
    }
  });

  const updatePost = async (
    { id, author, title, content, media },
    callback
  ) => {
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
      const deletedPost = await Task.findOneAndDelete(id);

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

  socket.on("create-post", async (payload, callback) => {
    try {
      const { title, content, media } = payload;

      const post = await Task.create({
        author: socket.user._id,
        title,
        content,
        media,
      });

      const populatedPost = await post.populate(
        "author",
        "firstName lastName username profile"
      );

      io.emit("new-post", populatedPost); // broadcast to all

      if (callback) callback({ success: true, post: populatedPost });
    } catch (error) {
      if (callback) callback({ success: false, error: error.message });
    }
  });


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

    socket.on("update-post", updatePost);
    socket.on("delete-post", deletePost);

    socket.on("disconnect", () => {
      console.log("user disconnected ", socket.id);
    });
  });
};

module.exports = setupSocket;

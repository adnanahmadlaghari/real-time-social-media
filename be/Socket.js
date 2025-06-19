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

    socket.on("my-posts", async (callback) => {
      try {
        const post = await Task.find({ author: socket.user._id }).populate(
          "author",
          "firstName lastName username profile"
        );
        callback({ success: true, post });
      } catch (error) {
        if (callback) callback({ success: false, error: error.message });
      }
    });

    socket.on("update-post", async (payload, callback) => {
      try {
        const { id, title, content, media } = payload;
        if (!id || !title || !content || !media) {
          return callback({ success: false, error: "Missing required fields" });
        }

        const post = await Task.findById(id);
        if (!post) throw new Error("Post not found");

        // Ownership check
        if (post.author.toString() !== socket.user._id.toString()) {
          return callback({ success: false, error: "Unauthorized" });
        }

        // Update fields
        post.title = title;
        post.content = content;
        post.media = media;

        const updatedPost = await post.save();
        await updatedPost.populate(
          "author",
          "firstName lastName username profile"
        );

        io.emit("updated-post", updatedPost);
        if (callback) callback({ success: true, post: updatedPost });

        console.log("Updated:", updatedPost);
      } catch (error) {
        if (callback) callback({ success: false, error: error.message });
      }
    });

    socket.on("delete-post", async (id, callback) => {
      try {
        const post = await Task.findById(id);

        if (!post) throw new Error("Post not found");

        if (post.author.toString() !== socket.user._id.toString()) {
          return callback({ success: false, error: "Unauthorized" });
        }

        await post.deleteOne();

        io.emit("deleted-post", id);
        if (callback) callback({ success: true, id });

        console.log("Deleted:", post);
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

    socket.on("disconnect", () => {
      console.log("user disconnected ", socket.id);
    });
  });
};

module.exports = setupSocket;

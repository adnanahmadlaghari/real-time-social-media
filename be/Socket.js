const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const Task = require("./models/Task");
const socketPagination = require("./middleware/Pagination");

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
      console.error("Socket auth error:", error.message);
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
        const { id, title, content } = payload;
        if (!id || !title || !content) {
          return callback({ success: false, error: "Missing required fields" });
        }

        // Only update if the post exists AND belongs to the current user
        const updatedPost = await Task.findOneAndUpdate(
          { _id: id, author: socket.user._id },
          { title, content },
          { new: true }
        ).populate("author", "firstName lastName username profile");

        if (!updatedPost) {
          return callback({
            success: false,
            error: "Unauthorized or Post not found",
          });
        }

        io.emit("updated-post", updatedPost);
        if (callback) callback({ success: true, post: updatedPost });

        console.log("Updated:", updatedPost);
      } catch (error) {
        if (callback) callback({ success: false, error: error.message });
      }
    });

    socket.on("delete-post", async (id, callback) => {
      try {
        const deletedPost = await Task.findOneAndDelete({
          _id: id,
          author: socket.user._id,
        });

        if (!deletedPost) {
          return callback({
            success: false,
            error: "Unauthorized or Post not found",
          });
        }

        io.emit("deleted-post", { id }); // Emit only id
        if (callback) callback({ success: true, id });

        // console.log("Deleted:", deletedPost);
      } catch (error) {
        if (callback) callback({ success: false, error: error.message });
      }
    });

    socket.on("get-all-posts", async (payload, callback) => {
      try {
        const { skip, limit, page } = socketPagination(payload);

        const total = await Task.countDocuments()

        const posts = await Task.find()
          .populate("author", "firstName lastName username profile")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);

          const totalPages = Math.ceil(total/limit)

        callback({ 
          success: true, 
          posts,
          currentPage: page,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
          total 
        });
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

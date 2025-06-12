const { Server } = require("socket.io");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // change to your frontend URL
      methods: ["GET", "POST"],
    },
  });

  const userSocketMap = new Map();
  io.on("connection", (socket) => {
    console.log("a user is connected");

    socket.on("disconnect", () => {
      console.log("user disconnected ", socket.id);
    });
  });
};

module.exports = setupSocket;

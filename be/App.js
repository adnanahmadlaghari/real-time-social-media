const express = require("express");
const cors = require("cors")
const connectDB = require("./db/connect");
const authRouter = require("./routes/Auth");
const userRoute = require("./routes/User");
const taskRoute = require("./routes/Task");
const setupSocket = require("./Socket")
const passport = require("passport")
const dotenv = require("dotenv");
dotenv.config();
require("./jwt/accessToken")
const http = require("http");
const messageRoute = require("./routes/Message");

const app = express();
const server = http.createServer(app)

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*"
}))
app.use(passport.initialize())

app.use("/auth", authRouter)

app.use("/uploads/profile", express.static("uploads/profile"));
app.use("/uploads/file", express.static("uploads/file"));
app.use("/users", passport.authenticate("jwt", {session: false}), userRoute)
app.use("/tasks", passport.authenticate("jwt", {session: false}), taskRoute)
app.use("/onetoone", passport.authenticate("jwt", {session: false}), messageRoute)

// Middleware or routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

setupSocket(server)

const Start = async () => {
  try {
    console.log("Server started");
    await connectDB(process.env.MONGODB_URI);
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

Start()
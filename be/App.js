const express = require("express");
const connectDB = require("./db/connect");
const authRouter = require("./routes/Auth");
const userRoute = require("./routes/User");
const setupSocket = require("./Socket")
const passport = require("passport")
const dotenv = require("dotenv");
dotenv.config();
require("./jwt/accessToken")
const http = require("http")


const app = express();
const server = http.createServer(app)


// Middleware to parse JSON data
app.use(express.json());
app.use(passport.initialize())

app.use("/auth", authRouter)

app.use("/users", passport.authenticate("jwt", {session: false}), userRoute)



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
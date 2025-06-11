const express = require("express");
const connectDB = require("./db/connect");
const authRouter = require("./routes/Auth");

const dotenv = require("dotenv");
const userRoute = require("./routes/User");
dotenv.config();

const app = express();

// Middleware to parse JSON data
app.use(express.json());

app.use("/auth", authRouter)

app.use("/users", userRoute)

// Middleware or routes
app.get("/", (req, res) => {
  res.send("Hello world");
});


const Start = async () => {
  try {
    console.log("Server started");
    await connectDB(process.env.MONGODB_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

Start()
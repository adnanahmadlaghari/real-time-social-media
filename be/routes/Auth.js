
const express = require("express")
const { register, login } = require("../controller/auth")
const upload = require("../middleware/multer")
const { UploadProfilePic } = require("../controller/User")

const authRouter = express.Router()

authRouter.route("/register").post(register)
authRouter.route("/upload").post(upload.single("profile"), UploadProfilePic)

authRouter.route("/login").post(login)

module.exports = authRouter

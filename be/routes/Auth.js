
const express = require("express")
const { register, login } = require("../controller/auth")

const uploadProfile = require("../middleware/ProfileMulter")

const authRouter = express.Router()

authRouter.route("/register").post(uploadProfile.single("profile"),register)

authRouter.route("/login").post(login)

module.exports = authRouter

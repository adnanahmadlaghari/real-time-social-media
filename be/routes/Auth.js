const express = require("express")
const { register } = require("../controller/auth")

const authRouter = express.Router()

authRouter.route("/register").post(register)

module.exports = authRouter

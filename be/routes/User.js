

const express = require("express")
const { getSingleUser } = require("../controller/User")

const userRoute = express.Router()

userRoute.route("/:username").get(getSingleUser)

module.exports = userRoute
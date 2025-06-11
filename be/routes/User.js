

const express = require("express")
const { getSingleUser, getAllUser } = require("../controller/User")

const userRoute = express.Router()

userRoute.route("/").get(getAllUser)

userRoute.route("/:username").get(getSingleUser)

module.exports = userRoute
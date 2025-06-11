

const express = require("express")
const { getSingleUser, getAllUser, updateUser } = require("../controller/User")

const userRoute = express.Router()

userRoute.route("/").get(getAllUser)

userRoute.route("/:username").get(getSingleUser)
userRoute.route("/:id").patch(updateUser)

module.exports = userRoute
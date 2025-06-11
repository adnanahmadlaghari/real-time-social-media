

const express = require("express")
const { getSingleUser, getAllUser, updateUser, deleteUser } = require("../controller/User")

const userRoute = express.Router()

userRoute.route("/").get(getAllUser)

userRoute.route("/:username").get(getSingleUser)
userRoute.route("/:id").patch(updateUser).delete(deleteUser)

module.exports = userRoute
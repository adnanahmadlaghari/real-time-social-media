

const express = require("express")
const { getSingleUser, getAllUser, updateUser, deleteUser } = require("../controller/User")

const userRoute = express.Router()

userRoute.route("/").get(getAllUser).patch(updateUser).delete(deleteUser)

userRoute.route("/:username").get(getSingleUser)

module.exports = userRoute
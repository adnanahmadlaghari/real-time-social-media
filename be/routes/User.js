

const express = require("express")
const { getSingleUser, getAllUser, updateUser, deleteUser, updateProfileImage } = require("../controller/User")
const uploadProfile = require("../middleware/ProfileMulter")

const userRoute = express.Router()

userRoute.route("/").get(getAllUser).patch(updateUser).delete(deleteUser)
userRoute.route("/update-profile").patch(uploadProfile.single("profile"), updateProfileImage)

userRoute.route("/:username").get(getSingleUser)

module.exports = userRoute
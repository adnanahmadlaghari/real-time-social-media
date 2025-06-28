const express = require("express")

const { 
    getSingleUser, 
    getAllUser, 
    updateUser, 
    deleteUser, 
    updateProfileImage, 
    searchUsers
} = require("../controller/User")

const uploadProfile = require("../middleware/ProfileMulter")

const userRoute = express.Router()

userRoute.route("/").get(getAllUser).patch(updateUser).delete(deleteUser)

userRoute.route("/update-profile").patch(uploadProfile.single("profile"), updateProfileImage)

userRoute.route("/single").get(getSingleUser)
userRoute.route("/search").post(searchUsers)

module.exports = userRoute
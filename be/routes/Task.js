const express = require("express")
const { getSingleTask, fileUpload } = require("../controller/Task")
const upload = require("../middleware/multer")
const taskRoute = express.Router()

taskRoute.route("/:id").get(getSingleTask)
taskRoute.route("/upload").post(upload.single("media"), fileUpload)

module.exports = taskRoute
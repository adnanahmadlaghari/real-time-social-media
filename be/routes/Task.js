const express = require("express")
const { getSingleTask } = require("../controller/Task")
const taskRoute = express.Router()

taskRoute.route("/:id").get(getSingleTask)

module.exports = taskRoute
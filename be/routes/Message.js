const express = require("express")
const getOneToOneMessages = require("../controller/Message")

const messageRoute = express.Router() 

messageRoute.route("/:_id").get(getOneToOneMessages)

module.exports = messageRoute
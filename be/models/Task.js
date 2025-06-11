const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is Required"]
    },
    title:{
        type: String,
        required: [true, "Title is Required"],
        trim: true,
    },
    content: {
        type: String,
        required: [true, "Content is Required"],
        trim: true
    },
    media: {
        type: String
    }

}, {timestamps: true})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task
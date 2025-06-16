const mongoose = require("mongoose");
const Task = require("./Task")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: [true, "Username must be unique!"],
  },
  bio: {
    type: String
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  profile: {
    type: String,
  },
}, {toJSON: {virtuals: true},toObject: {virtuals: true}});

userSchema.virtual("tasks", {
  ref: 'Task',
  localField: '_id',
  foreignField: 'author'
})

userSchema.post("findOneAndDelete", async function(doc, next) {
  if(doc){
    await Task.deleteMany({author: doc._id})
  }
  next()
})

const User = mongoose.model("User", userSchema);
module.exports = User;

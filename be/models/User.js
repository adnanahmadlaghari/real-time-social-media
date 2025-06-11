const mongoose = require("mongoose");

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
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  profile: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

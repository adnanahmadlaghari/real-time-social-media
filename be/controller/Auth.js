const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { firstName, lastName, username, profile, password } = req.body;

    const user = await User.create({
      firstName,
      lastName,
      username,
      profile,
      password,
    });

    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      msg: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if(!user){
        return res.status(404).json({
            success: false,
            msg: "User Not Found"
        })
    }
    res.status(200).json({ success: true, user });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  register,
  login,
};

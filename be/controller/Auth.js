const User = require("../models/User");
const argon2 = require("argon2");

const register = async (req, res) => {
  try {
    const { firstName, lastName, username, profile, password } = req.body;

    const hashedPassword = await argon2.hash(password);

    const user = await User.create({
      firstName,
      lastName,
      username,
      profile,
      password: hashedPassword,
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

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
      });
    }
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid Credential",
      });
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

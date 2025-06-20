const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const payload = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    bio: user.bio,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, username, bio, password } = req.body;
     const profile = req.file
      ? `/uploads/profile/${req.file.filename}`
      : null;

    const hashedPassword = await argon2.hash(password);

    const createdUser = await User.create({
      firstName,
      lastName,
      username,
      bio,
      profile,
      password: hashedPassword,
    });

    const user = await User.findById(createdUser._id).select("-password");

    const { accessToken, refreshToken } = generateToken(user);

    res.status(201).json({ success: true, accessToken, refreshToken, user });
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

    const { accessToken, refreshToken } = generateToken(user);

    res.status(200).json({ success: true, accessToken, refreshToken, user });
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

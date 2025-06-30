const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
require("dotenv").config();

const generateToken = (user) => {
  const payload = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
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
    const { firstName, lastName, username, role, password } = req.body;
     const profile = req.file
      ? `/uploads/profile/${req.file.filename}`
      : null;

      const role_instance = await Role.find({name: role})
      if(role_instance === 0 ){
        return res.status(404).json({success: false, error: "role is wrong" });
      }

      console.log(role_instance)
    const hashedPassword = await argon2.hash(password);

    const createdUser = await User.create({
      firstName,
      lastName,
      username,
      profile,
      password: hashedPassword,
    });

    await Permission.create({user: createdUser._id, role : role_instance[0]._id})
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

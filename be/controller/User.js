const User = require("../models/User");
const argon2 = require("argon2")


const getSingleUser = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      msg: "Internal Server Error",
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      msg: "Internal Server Error",
    });
  }
};

const updateUser = async (req, res) => {

  try {
      const {id} = req.params
      
      const {firstName, lastName, username, password, profile} = req.body

      const hashedPassword = await argon2.hash(password) 
      const user = await User.findByIdAndUpdate({_id: id},{
      firstName,
      lastName,
      username,
      password: hashedPassword,
      profile
    }, {new: true, runValidators: true}).select('-password')

    if(!user) {
      return res.status(404).json({
        success: false,
        error: "User Not Found"
      })
    }
    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      msg: "Internal Server Error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {

    const {id} = req.params

    const user = await User.findByIdAndDelete({_id: id})
    
    if(!user){
      return res.status(404).json({
        success: false,
        error: "User Not Found"
      })
    }

    res.status(200).json({
      success: true,
      msg: `User with ID: ${id} Deleted.`
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      msg: "Internal Server Error",
    });
  }
}

module.exports = {
  getSingleUser,
  getAllUser,
  updateUser,
  deleteUser
};

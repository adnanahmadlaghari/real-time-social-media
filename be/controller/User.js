const User = require("../models/User");
const argon2 = require("argon2");
const fs = require("fs");
const path = require("path");

const getSingleUser = async (req, res) => {
  try {
    const { username } = req.user;

    const user = await User.findOne({ username })
      .select("-password");

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
  const {id} = req.user
  try {
    const users = await User.find({_id : {$ne: id}}).populate("tasks").select("-password");
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
    const { id } = req.user;

    const { firstName, lastName, username, password } = req.body;

    const updateData = {
      firstName,
      lastName,
      username,
    };

    if (password) {
      updateData.password = await argon2.hash(password);
    }

    const user = await User.findByIdAndUpdate(
      { _id: id },
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findByIdAndDelete({ _id: id });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      msg: `User with ID: ${id} Deleted.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      msg: "Internal Server Error",
    });
  }
};

const searchUsers = async(req, res) => {

  try {
    
    const {search} = req.body
    
    if(search === undefined || search === null){
       return res.status(400).json({ success: false, error: "Search term is required" });
    }

    const sanitizedSearchTerm = search.trim().replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(sanitizedSearchTerm, "i");

    const contact = await User.find({$and: [
      {_id: {$ne: req.user.id}},
      {$or: [{firstName: regex}, {lastName: regex}, {username: regex}]}
    ]})

    res.status(200).json({success: true, contact})
  } catch (error) {
     res.status(500).json({
      success: false,
      error: error.message,
      msg: "Internal Server Error",
    });
  }
}

const updateProfileImage = async (req, res) => {
  try {
    const { id } = req.user;

    const userP = await User.findById(id).select("-password");

    if (!userP) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
      });
    }
    if (!req.file) {
      return res.status(404).json({
        success: false,
        error: "Profile Picture Is Missing",
      });
    }

    if(userP.profile){
      const oldImagePath = path.join(__dirname, "..", userP.profile)
      if(fs.existsSync(oldImagePath)){
        fs.unlinkSync(oldImagePath)
      }
    }
    // console.log(req.file)

    const newImagePath = `/uploads/profile/${req.file.filename}`
    userP.profile = newImagePath
    await userP.save()
 
   return res.status(200).json({
      success: true,
      newImagePath,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getSingleUser,
  getAllUser,
  updateUser,
  deleteUser,
  updateProfileImage,
  searchUsers
};

const User = require("../models/User")


const getSingleUser = async (req, res) => {
  try {
    
    const {username} = req.params

    const user = await User.findOne({username}).select("-password")

    if(!user){
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


module.exports = {
    getSingleUser
}
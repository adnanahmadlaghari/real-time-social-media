const Message = require("../models/Message")

const getOneToOneMessages = async(req, res) => {

    try {
      const {id} = req.user
      const {_id} = req.params
        if(!id || !_id){
        return res.status(404).json({success: false, error: "Both IDs are Required"})
    }

    const oneToOne = await Message.find({
        $or: [
            {sender: id, recipient: _id},
            {sender: _id, recipient: id}
        ]
    })
    
    res.status(200).json({success: true, oneToOne})    
    } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      msg: "Internal Server Error",
    });   
    }
}

module.exports = getOneToOneMessages
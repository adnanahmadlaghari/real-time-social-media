const Task = require("../models/Task");

const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task Not Found",
      });
    }

    res.status(200).json({
        success: true,
        task
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      msg: "Internal Server Error",
    });
  }
};


const fileUpload = async(req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
  
    const filePath = `/uploads/file/${req.file.filename}`;

    res.status(200).json({ success: true, mediaUrl: filePath });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      msg: "Internal Server Error",
    });
  }
}

module.exports = {
  getSingleTask,
  fileUpload
};

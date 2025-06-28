const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender is required"],
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Recipient is required"],
    },
    messageType: {
      type: String,
      enum: ["text", "file"],
      required: true,
    },
    text: {
      type: String,
      required: function () {
        return this.messageType === "text";
      },
    },
    file: {
      type: String,
      required: function () {
        return this.messageType === "file";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);

const mongoose = require("mongoose")

const permissionSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is Required"]
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: [true, "Role is Required"]
    }
})


permissionSchema.post("save", async function() {
    const Permission = mongoose.model("Permission")
    const permissions = await Permission.find({user: this.user}).populate("role")
    const roles = permissions.map((p) => p.role.name)
    const User = mongoose.model("User");
    await User.findByIdAndUpdate(this.user, {roles})
})



const Permission = mongoose.model("Permission", permissionSchema)

module.exports = Permission
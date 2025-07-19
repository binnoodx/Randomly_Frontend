import mongoose, { Collection } from "mongoose"
const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: false,
        default: "user"
    },
  
    email: {
        type: String,
        required: true,
    },


    createdAt: {
        type: Date,
        default: Date.now,
    },


})

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User
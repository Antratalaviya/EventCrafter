import mongoose from "mongoose";


const avatarSchema = new mongoose.Schema({
    url: {
        type: String,
    }
});

export const Avatar = mongoose.model("avatar", avatarSchema)
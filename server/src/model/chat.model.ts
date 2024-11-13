import mongoose from "mongoose";
import { Collection } from "../utils/appString";
import { ChatDocument } from "../constants";

const ChatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
}, {
    timestamps: true
})

export const Chat = mongoose.model<ChatDocument>(Collection.MODEL_CHAT, ChatSchema)
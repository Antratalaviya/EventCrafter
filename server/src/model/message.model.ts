import mongoose from "mongoose";
import { Collection } from "../utils/appString";
import { MsgDocument } from "../constants";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const Message = mongoose.model<MsgDocument>(Collection.MODEL_MESSAGE, messageSchema)
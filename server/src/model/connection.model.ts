import mongoose from "mongoose";
import { Collection } from "../utils/appString";


const connectionSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    pending: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

export const Connection = mongoose.model(Collection.MODEL_CONNECTION, connectionSchema);
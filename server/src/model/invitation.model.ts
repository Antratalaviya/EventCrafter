import mongoose from "mongoose";
import { Collection } from "../utils/appString";


const invitationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
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

export const Invitation = mongoose.model(Collection.MODEL_INVITATION, invitationSchema);
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
    accepted: {
        type: Boolean,
        default: false
    },
    rejected: {
        type: Boolean,
        default: false
    },
    pending: {
        type: Boolean,
        default: true
    }
})

export const Invitation = mongoose.model(Collection.MODEL_INVITATION, invitationSchema);
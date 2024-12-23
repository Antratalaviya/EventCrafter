import mongoose from "mongoose";
import { Collection } from "../utils/appString";

const bookEventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male"
    },
    mobileNumber: {
        type: String,
        required: true
    },
    vip: {
        type: String,
    },
    economy: {
        type: String
    },
    vip_price: {
        type: String,
    },
    economy_price: {
        type: String
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
})

export const BookEvent = mongoose.model(Collection.MODEL_BOOKEVENT, bookEventSchema)
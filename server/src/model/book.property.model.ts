import mongoose from "mongoose";
import { Collection } from "../utils/appString";

const bookPropertySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    checkin: {
        type: String,
        required: true
    },
    checkout: {
        type: String,
        required: true
    },
    participants: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export const BookProperty = mongoose.model(Collection.MODEL_BOOKPROPERTY, bookPropertySchema)
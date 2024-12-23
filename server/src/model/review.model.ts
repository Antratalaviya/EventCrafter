import mongoose from "mongoose";
import { Collection } from "../utils/appString";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    },
    photos: [{
        url: {
            type: String,
        }
    }],
    text: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export const Review = mongoose.model(Collection.MODEL_REVIEW, reviewSchema)
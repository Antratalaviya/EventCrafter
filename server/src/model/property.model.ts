import mongoose from "mongoose";
import { Collection } from "../utils/appString";
import { PropertyDocument } from "../constants";

const propertySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    amenities: [{
        type: String,
        required: true
    }],
    purpose: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    photos: [{
        url: {
            type: String,
            required: true
        }
    }],
    videoFile: {
        url: {
            type: String,
            // required : true
        }
    },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
}, {
    timestamps: true
})

export const Property = mongoose.model<PropertyDocument>(Collection.MODEL_PROPERTY, propertySchema)
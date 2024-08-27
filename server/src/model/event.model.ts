import mongoose from "mongoose";
import { EventDocument } from "../constants";
import { Collection } from "../utils/appString";


const eventSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ["private", "public", "workshop", "ticket", "business"],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle1: {
        type: String,
        required: true
    },
    subtitle2: {
        type: String,
        required: true
    },
    expiresIn: {
        type: Number,
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    offers: {
        type: Array,
        required: true
    },
    carCapacity: {
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
    photos: [{
        url: {
            type: String,
            required: true
        }
    }],
    pdfFile: [{
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
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
    },
    status: {
        type: String,
        enum: ['upcoming', 'completed', 'cancelled', "draft"],
        default: 'upcoming'
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    timestamps: true
})

eventSchema.pre("save", async function (this: EventDocument, next) {
    const end = new Date(this.endDate).getTime();
    const start = new Date(Date.now()).getTime();
    this.expiresIn = Number(((end - start) / (1000 * 60 * 60 * 24)).toFixed(0));
    next();
})

export const Event = mongoose.model(Collection.MODEL_EVENT, eventSchema);


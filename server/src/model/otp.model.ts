import mongoose from "mongoose";
import { Collection } from "../utils/appString";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export const Otp = mongoose.model(Collection.MODEL_OTP, otpSchema);
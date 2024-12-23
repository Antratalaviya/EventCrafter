import mongoose from "mongoose";
import { Collection } from "../utils/appString";


const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    amount: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    customerDetails: {
        type: Object,
        required: true
    },
    paymentIntent: {
        type: String,
        required: true,
        unique: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    // transactionType: {
    //     type: String,
    //     enum: ['spent', 'received'],
    //     default: "spent"
    // }
    // transaction: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Transaction",
    // }
}, {
    timestamps: true
})


export const Payment = mongoose.model(Collection.MODEL_PAYMENT, paymentSchema);
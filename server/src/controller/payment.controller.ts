import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import Stripe from "stripe";
import status from "http-status";
import { AppString } from "../utils/appString";
import userService from "../service/user.service";
import paymentService from "../service/payment.service";
import mongoose from "mongoose";

const sk = process.env.STRIPE_SK!
const stripe = new Stripe("sk_test_51PErw9SGO3pe3b4NoUqk6yV8DqkT1xOfBzsSu01qaWqpVmaPGvv1ELPa0JI0rgqe4tPdcxodJoPOLZmeOPqCTCRT00iJWEE5d1", {
    typescript: true
});

const createCheckoutSession = asyncHandler(async (req: Request, res: Response) => {
    const { amount, description, name, quantity } = req.body;
    const product = await stripe.products.create({
        name: name,
        description: description,
    });

    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.floor(parseInt(amount)),
        currency: 'usd',
    });

    try {
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    price: price.id,
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            return_url: `http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}`,
        });


        return res.status(status.OK).json(new ApiResponse(status.OK, { client_secret: session.client_secret }, AppString.CLIENT_SECRET_RETRIEVED));
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const sessionStatus = asyncHandler(async (req: Request, res: Response) => {
    const session_id = typeof req.query?.session_id === "string"
        && req.query?.session_id || "";

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);


        return res.status(status.OK).json(new ApiResponse(status.OK, {
            session,
            status: session.status,
            customer_email: session.customer_details?.email
        }, AppString.CLIENT_SECRET_RETRIEVED));
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const createPaymentOrder = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { session } = req.body;
        const { userId } = req.params;

        const order = await paymentService.createPayent({
            user: new mongoose.Types.ObjectId(userId),
            amount: session.amount_total ? (session.amount_total / 100).toString() : "",
            currency: session.currency,
            status: session.status,
            paymentMethod: session.payment_method_types[0],
            customerDetails: session.customer_details,
            paymentIntent: session.payment_intent,
            paymentStatus: session.payment_status,
        })
        return res.status(status.OK).json(new ApiResponse(status.OK, order, AppString.ORDER_PLACED))

    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message))
    }
});

const getPaymentOrders = asyncHandler(async (req: Request, res: Response) => {
    try {
        const payments = await paymentService.getPayent();

        if (payments.length === 0) {
            return res.status(status.OK).json(new ApiResponse(status.OK, [], AppString.PAYMENT_ORDERS))
        }

        return res.status(status.OK).json(new ApiResponse(status.OK, payments, AppString.PAYMENT_ORDERS))

    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json(new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message))
    }
});




export default {
    createCheckoutSession,
    sessionStatus,
    getPaymentOrders,
    createPaymentOrder
}
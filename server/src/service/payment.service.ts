import { PaymentInput } from "../constants";
import { Payment } from "../model/payment.model";

const createPayent = async (body: PaymentInput) => {
    return await Payment.create(body);
}

const getPayent = async () => {
    return await Payment.find();
}

export default {
    createPayent,
    getPayent
}
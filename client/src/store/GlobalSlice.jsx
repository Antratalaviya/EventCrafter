import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    progress: 1,
    acceptConcent: false,
    payment: {
        amount: 0.99,
        name: "Private event purchase",
        description: "Selected Silver Package",
        quantity: 1,
        package: "silver",
    },
    clientSecret: "",
    paymentType: "",
    paymentDone: false,
}

export const globalSlicer = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setProgress: (state, action) => {
            state.progress = action.payload;
        },
        setAcceptConcent: (state, action) => {
            state.acceptConcent = action.payload;
        },
        setPayment: (state, action) => {
            state.payment = { ...state.payment, ...action.payload };
        },
        setClientSecret: (state, action) => {
            state.clientSecret = action.payload;
        },
        setPaymentType: (state, action) => {
            state.paymentType = action.payload;
        },
        setPaymentDone: (state, action) => {
            state.paymentDone = action.payload;
        }
    }
})

export const { setProgress, setAcceptConcent, setPayment, setClientSecret, setPaymentType, setPaymentDone } = globalSlicer.actions;

export default globalSlicer.reducer;
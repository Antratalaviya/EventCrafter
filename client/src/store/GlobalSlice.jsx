import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    progress: 1,
    acceptConcent: false,
    payment: {
        amount: 0.99,
        name: "Private event purchase",
        description: "Selected Silver Package",
        quantity: 1
    },
    clientSecret: "",
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
            state.payment = action.payload;
        },
        setClientSecret: (state, action) => {
            state.clientSecret = action.payload;
        }
    }
})

export const { setProgress, setAcceptConcent, setPayment, setClientSecret } = globalSlicer.actions;

export default globalSlicer.reducer;
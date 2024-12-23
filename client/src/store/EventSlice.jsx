import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    event: {
        type: "",
        title: "",
        subtitle1: "",
        subtitle2: "",
        category: "Select event category",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        offers: [],
        carCapacity: "10",
        street: "",
        city: "",
        country: "",
        description: "",
        videoFile: "",
        pdfFile: [],
        photos: [],
        vip: "",
        vip_price: "",
        economy: "",
        economy_price: "",
    },
}
/**

"mumbai, maharashtra"
"India"
"Important: Outsiders are strictly prohibited"
"01, Aterior Party Plot" 
 */

export const eventSlicer = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvent: (state, action) => {
            state.event = { ...state.event, ...action.payload };
        },
        updateEvent: (state, action) => {
            state.event = { ...action.payload };
        },
    }
})

export const { setEvent, updateEvent } = eventSlicer.actions;

export default eventSlicer.reducer;

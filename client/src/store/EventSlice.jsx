import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    events: [],
}

export const eventSlicer = createSlice({
    name: 'event',
    initialState,
    reducers: {
        postEvents: (state, action) => {
            state.events = action.payload;
        },
    }
})

export const { postEvents } = eventSlicer.actions;

export default eventSlicer.reducer;

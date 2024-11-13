import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentRecipient: "",
    socketConnection: "",
    onlineUsers: []
}

export const chatSlicer = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentRecipient: (state, action) => {
            state.currentRecipient = action.payload
        },
        setSocketConnection: (state, action) => {
            state.socketConnection = action.payload
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        },
    }
})

export const { setCurrentRecipient, setSocketConnection, setOnlineUsers } = chatSlicer.actions;

export default chatSlicer.reducer;
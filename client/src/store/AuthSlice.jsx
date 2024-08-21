import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: null,
    status: false
}

export const authSlicer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogin: (state, action) => {
            localStorage.setItem('auth', JSON.stringify(action.payload))
            state.status = true
            state.userData = action.payload;
        },
        authLogout: (state) => {
            localStorage.setItem('auth', '')
            state.status = false;
            state.userData = null;
        }
    }
})

export const { authLogin, authLogout } = authSlicer.actions;

export default authSlicer.reducer;

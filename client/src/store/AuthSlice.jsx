import { createSlice } from '@reduxjs/toolkit';
import { getItem, setItem } from '../utils/localStorageUtility';

const initialState = {
    userData: getItem("user") ? JSON.parse(getItem("user")) : null,
    status: false
}

export const authSlicer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogin: (state, action) => {
            state.status = true
            state.userData = action.payload;
            setItem("user", JSON.stringify(state.userData));
        },
        authLogout: (state) => {
            state.status = false;
            state.userData = null;
            setItem('user', "")
        }
    }
})

export const { authLogin, authLogout } = authSlicer.actions;

export default authSlicer.reducer;

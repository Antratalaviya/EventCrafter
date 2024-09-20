import { createSlice } from '@reduxjs/toolkit';
import { getItem, removeItem, setItem } from '../utils/localStorageUtility';
import { CONSTS } from '../utils/consts';

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

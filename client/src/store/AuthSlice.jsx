import { createSlice } from '@reduxjs/toolkit';
import { removeItem } from '../utils/localStorageUtility';
import { CONSTS } from '../utils/consts';

const initialState = {
    userData: null,
    status: false
}

export const authSlicer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogin: (state, action) => {
            state.status = true
            state.userData = action.payload;
        },
        authLogout: (state) => {
            // removeItem(CONSTS.ACCESS_TOKEN)
            state.status = false;
            state.userData = null;
        }
    }
})

export const { authLogin, authLogout } = authSlicer.actions;

export default authSlicer.reducer;

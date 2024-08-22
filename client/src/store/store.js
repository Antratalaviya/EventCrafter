import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice.jsx"

const store = configureStore({
  reducer: {
    [authReducer.name]: authReducer
  },
});

export default store;

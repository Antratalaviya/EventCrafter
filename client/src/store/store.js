import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authSlicer } from "./AuthSlice.jsx"
import { api } from "../api/api.js";

const store = configureStore({
  reducer: {
    [authSlicer.name]: authReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

export default store;

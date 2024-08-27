import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authSlicer } from "./AuthSlice.jsx"
import { api } from "../api/api.js";
import eventReducer, { eventSlicer } from "./EventSlice.jsx";

const store = configureStore({
  reducer: {
    [authSlicer.name]: authReducer,
    [eventSlicer.name]: eventReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authSlicer } from "./AuthSlice.jsx"
import { api } from "../api/api.js";
import eventReducer, { eventSlicer } from "./EventSlice.jsx";
import globalReducer, { globalSlicer } from "./GlobalSlice.jsx";

const store = configureStore({
  reducer: {
    [authSlicer.name]: authReducer,
    [eventSlicer.name]: eventReducer,
    [globalSlicer.name]: globalReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware)
});

export default store;

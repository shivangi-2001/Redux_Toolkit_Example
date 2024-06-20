// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "../service/postApi";
import postReducer from "../feature/postSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

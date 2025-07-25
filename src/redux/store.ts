import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "../features/contents/contentSlice";

export const store = configureStore({
  reducer: {
    content: contentReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {};

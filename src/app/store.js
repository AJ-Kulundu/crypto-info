import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { coinRankApi } from "../services/api";

export const store = configureStore({
  reducer: {
    [coinRankApi.reducerPath]: coinRankApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinRankApi.middleware),
});

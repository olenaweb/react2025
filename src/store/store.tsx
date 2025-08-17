import { configureStore } from "@reduxjs/toolkit";

import { favoriteReducer } from "./slices/favoriteSlice";
import { characterApi } from "@/request/characterApi";

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
    [characterApi.reducerPath]: characterApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(characterApi.middleware),
  devTools: {
    actionsDenylist: ["characterApi/internalSubscriptions/subscriptionsUpdated"],
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

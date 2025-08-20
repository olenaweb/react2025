import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { favoriteReducer } from "./slices/favoriteSlice";
import { characterApi } from "@/request/characterApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      favorites: favoriteReducer,
      [characterApi.reducerPath]: characterApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(characterApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });

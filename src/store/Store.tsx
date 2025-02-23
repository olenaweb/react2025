import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { characterApi } from "./services/characterApi";
import { paginationSliceReducer } from "./features/paginationSlice";

import { favoriteReducer } from "./services/favoriteSlice";

export const store = configureStore({
  reducer: {
    pagination: paginationSliceReducer,
    favorites: favoriteReducer,
    [characterApi.reducerPath]: characterApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(characterApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

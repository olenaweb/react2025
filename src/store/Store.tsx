import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { characterApi } from "./services/characterApi";
import paginationSliceReducer from "./features/paginationSlice";

import { favoriteReducer } from "./services/favoriteSlice";

export const store = configureStore({
  reducer: {
    pagination: paginationSliceReducer,
    favorites: favoriteReducer,
    // Add the API reducer to the store
    [characterApi.reducerPath]: characterApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(characterApi.middleware),
});

// Configures listeners to update RTK Query data when state changes:refetchOnFocus
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

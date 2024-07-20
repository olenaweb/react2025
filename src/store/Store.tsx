import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { characterApi } from './services/characterApi';
import paginationReducer, { PaginationState } from './features/paginationSlice';

export const store = configureStore({
  reducer: {
    // Add the API reducer to the store
    pagination: paginationReducer,
    [characterApi.reducerPath]: characterApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState> & {
  pagination: PaginationState;
};
export type AppDispatch = typeof store.dispatch;

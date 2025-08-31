import { configureStore } from "@reduxjs/toolkit";
import { countryReducer } from "@/features/countries/countriesSlice";
import { informReducer } from "@/features/countries/informSlice";
export const store = configureStore({
  reducer: {
    countries: countryReducer,
    inform: informReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

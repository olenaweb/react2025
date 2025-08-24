import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import { countryReducer } from "@/features/countries/countriesSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    countries: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

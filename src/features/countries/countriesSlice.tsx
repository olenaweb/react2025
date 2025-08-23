import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import countriesList from "./countriesList";

export interface CountriesState {
  countries: string[];
}
const initialState: CountriesState = {
  countries: countriesList,
};

export const countriesSlice = createSlice({
  name: "countrySlice",
  initialState,
  reducers: {
    addCountry(state, action: PayloadAction<string>) {
      state.countries.push(action.payload);
    },

    removeCountry(state, action: PayloadAction<string>) {
      state.countries = state.countries.filter((country) => country !== action.payload);
    },
  },
});

export const { addCountry, removeCountry } = countriesSlice.actions;
export const countryReducer = countriesSlice.reducer;

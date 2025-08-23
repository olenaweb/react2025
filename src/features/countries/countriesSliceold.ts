import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import countriesList from "./countriesList";
console.log('"countriesList="', countriesList);
export interface CountryState {
  countries: string[];
}
const initialState: CountryState = {
  countries: countriesList,
};
const countriesSlice = createSlice({
  name: "countrySlice",
  initialState: initialState,
  reducers: {
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload;
    },
  },
});

export default countriesSlice.reducer;

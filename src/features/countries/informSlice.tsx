import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData } from "@/type/type";

type InformState = {
  data: FormData;
};

const initialState: InformState = {
  data: {
    co2_per_gdp: false,
    gdp: false,
    ghg_per_capita: false,
    cumulative_co2: false,
    co2_growth_prct: false,
    methane: false,
    methane_per_capita: false,
    nitrous_oxide: false,
    nitrous_oxide_per_capita: false,
    total_ghg: false,
  } as FormData,
};

const informSlice = createSlice({
  name: "inform",
  initialState,
  reducers: {
    saveInform: (state, action: PayloadAction<FormData>) => {
      state.data = action.payload;
    },
  },
});

export const saveInform = informSlice.actions.saveInform;
export const informReducer = informSlice.reducer;

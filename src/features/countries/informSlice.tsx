import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData } from "@/type/type";

type InformState = {
  data: FormData;
};

const initialState: InformState = {
  data: {
    population_growth_prct: false,
    gdp: false,
    cement_co2: false,
    co2_growth_abs: false,
    co2_growth_prct: false,
    methane: false,
    methane_per_capita: false,
    nitrous_oxide: false,
    nitrous_oxide_per_capita: false,
    temperature_change_anomaly: false,
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

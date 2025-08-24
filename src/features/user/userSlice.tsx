import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData } from "@/type/type";

type UserState = {
  data: FormData[];
  highlight: boolean;
};

const initialState: UserState = {
  data: [] as FormData[],
  highlight: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<FormData>) => {
      state.data.push(action.payload);
      state.highlight = true;
    },
    clearHighlight(state) {
      state.highlight = false;
    },
  },
});

export const { saveUser, clearHighlight } = userSlice.actions;
export default userSlice.reducer;

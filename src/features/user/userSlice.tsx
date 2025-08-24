import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormData } from "@/type/type";

type UserState = {
  data: FormData[];
};

const initialState: UserState = {
  data: [] as FormData[],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<FormData>) => {
      state.data.push(action.payload);
    },

  },
});

export const { saveUser } = userSlice.actions;
export default userSlice.reducer;

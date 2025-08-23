import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserData = {
  name: string;
  age: number;
  email: string;
  gender: string;
  image?: string;
  country: string;
};

type UserState = {
  data: UserData | null;
  highlight: boolean;
};

const initialState: UserState = {
  data: null,
  highlight: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser(state, action: PayloadAction<UserData>) {
      state.data = action.payload;
      state.highlight = true;
    },
    clearHighlight(state) {
      state.highlight = false;
    },
  },
});

export const { saveUser, clearHighlight } = userSlice.actions;
export default userSlice.reducer;

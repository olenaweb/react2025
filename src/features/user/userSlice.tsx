import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formData } from "@/type/type";

type UserState = {
  data: formData[];
  highlight: boolean;
};

const initialState: UserState = {
  data: [] as formData[],
  highlight: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // saveUser(state, action: PayloadAction<formData>) {
    //   state.data = action.payload;
    //   state.highlight = true;
    // },
    saveUser: (state, action: PayloadAction<formData>) => {
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PaginationState {
  currentPage: string;
  lastPage: number | null;
}

const initialState: PaginationState = {
  currentPage: "1",
  lastPage: null,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<string>) {
      console.log('"setCurrentPage action.payload="', action.payload);
      state.currentPage = action.payload;
    },
    setLastPage(state, action: PayloadAction<number | null>) {
      console.log('"setLastPage action.payload="', action.payload);
      state.lastPage = action.payload;
    },
  },
});
export const { setCurrentPage, setLastPage } = paginationSlice.actions;
export const paginationSliceReducer = paginationSlice.reducer;

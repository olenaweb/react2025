import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteItem } from "../../types/types";

export interface FavoriteState {
  favorites: FavoriteItem[];
}
const initialState: FavoriteState = {
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: "favoriteSlice",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteItem>) {
      const isThere = state.favorites.some((item) => item.id === action.payload.id);
      if (!isThere) {
        state.favorites.push(action.payload);
      }
    },

    removeFavorite(state, action: PayloadAction<FavoriteItem>) {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;

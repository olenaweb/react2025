export type FavoriteState = ReturnType<
  typeof import("./slices/favoriteSlice").favoriteReducer
>;

export type RootState = {
  favorites: FavoriteState;
  [key: string]: unknown;
};
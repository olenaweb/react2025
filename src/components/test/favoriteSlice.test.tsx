import { favoriteReducer, addFavorite, removeFavorite } from "../../store/favoriteSlice";
import { FavoriteItem } from "../../types/types";

describe("favoriteSlice", () => {
  const sampleItem: FavoriteItem = {
    id: 1,
    name: "Rick",
    image: "http://example.com/rick.png",
    gender: "Male",
    species: "Human",
    status: "Alive",
  };

  it("must have an initial state", () => {
    const initialState = favoriteReducer(undefined, { type: "" });
    expect(initialState).toEqual({ favorites: [] });
  });

  it("should add an element to the favorites", () => {
    const initialState = { favorites: [] };
    const nextState = favoriteReducer(initialState, addFavorite(sampleItem));
    expect(nextState.favorites).toContainEqual(sampleItem);
  });

  it("should not add duplicates", () => {
    const initialState = { favorites: [sampleItem] };
    const nextState = favoriteReducer(initialState, addFavorite(sampleItem));
    expect(nextState.favorites).toHaveLength(1);
  });

  it("must remove the element from the chosen one", () => {
    const initialState = { favorites: [sampleItem] };
    const nextState = favoriteReducer(initialState, removeFavorite(sampleItem));
    expect(nextState.favorites).toHaveLength(0);
  });
});

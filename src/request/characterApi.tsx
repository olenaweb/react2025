import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Action, PayloadAction } from "@reduxjs/toolkit";
import { Character, Info } from "../types/types";
type RootState = any;
function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === "__NEXT_REDUX_REHYDRATE__";
}
export const characterApi = createApi({
  reducerPath: "characterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCharacters: builder.query<{ info: Info; results: Character[] }, string>({
      query: (arg) => {
        const [name, pageStr] = arg.split("-");
        const askName = name ? name.trim() : "";
        const page = Number(pageStr);
        return {
          url: "/character/",
          params: {
            name: askName,
            page: page,
          },
        };
      },
    }),
    getCharacterById: builder.query<Character, string>({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useLazyGetCharactersQuery,
  useLazyGetCharacterByIdQuery,
} = characterApi;

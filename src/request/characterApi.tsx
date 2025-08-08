import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Character, Info } from "../types/types";

export const characterApi = createApi({
  reducerPath: "characterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getCharacters: builder.query<
      { info: Info; results: Character[] },
      { name: string; page: string }
    >({
      query: ({ name, page }) => ({
        url: `character/`,
        params: {
          name: name,
          page: page,
        },
      }),
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

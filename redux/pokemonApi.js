import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  tagTypes: ["Pokemon"],

  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,

      transformResponse: (response) => {
        return {
          species: response.species,
          sprites: response.sprites,
        };
      },
    }),

    providesTags: ["Pokemon"],

    getPokemonList: builder.query({
      query: (item) => {
        console.log("item", item);
        // console.log("World");

        return `pokemon?limit=10`;
      },

      transformResponse: (response) => response.results,
    }),

    providesTags: ["Pokemon"],
  }),
});

// Export hooks for usage in functional components
export const {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
  util: { getRunningQueriesThunk },
} = pokemonApi;

// export endpoints for use in SSR
export const { getPokemonByName, getPokemonList } = pokemonApi.endpoints;

export const getDetails = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  return data;
};

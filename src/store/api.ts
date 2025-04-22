import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
    reducerPath: "pokemonApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
    endpoints: (builder) => ({
        getPokemonList: builder.query({
            query: (params = "?offset=0&limit=21") => `pokemon${params}`,
        }),
        getPokemonByName: builder.query({
            query: (name: string) => `pokemon/${name}`,
        }),
        getPokemonSpecies: builder.query<any, string>({
            query: (name) => `pokemon-species/${name}`,
        }),
        getEvolutionChain: builder.query<any, string>({
            query: (id) => `evolution-chain/${id}`,
        }),
    }),
});

// Hooks
export const { useGetPokemonListQuery, useGetPokemonByNameQuery, useGetPokemonSpeciesQuery, useGetEvolutionChainQuery } = pokemonApi;

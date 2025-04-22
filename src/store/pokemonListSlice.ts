import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface PokemonListState {
    results: { name: string; url: string }[];
    loading: boolean;
    error: string | null;
}

const initialState: PokemonListState = {
    results: [],
    loading: false,
    error: null,
};

export const fetchFullPokemonList = createAsyncThunk(
    "pokemonList/fetchFull",
    async () => {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        if (!res.ok) throw new Error("Failed to fetch Pokémon list");
        return (await res.json()).results;
    }
);

const pokemonListSlice = createSlice({
    name: "pokemonList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFullPokemonList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFullPokemonList.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(fetchFullPokemonList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Error";
            });
    },
});

export const selectPokemonList = (state: RootState) => state.pokemonList;
export default pokemonListSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

// Describes the data structure
interface PokemonData {
    name: string;
    id: string;
    sprites: {
        front_default: string;
    };
    types: {
        type: { name: string; };
    }[];
}

interface RandomPokemonState {
    data: PokemonData | null;
    loading: boolean;
    error: string | null;
}

// Initializes state for data, loading and error actions
const initialState: RandomPokemonState = {
    data: null,
    loading: false,
    error: null,
};

// Fetches random pokemon asyncronous inside Redux
export const fetchRandomPokemon = createAsyncThunk(
    "randomPokemon/fetch",
    async() => {
        const randomId = Math.floor(Math.random() * 898) + 1; // Using 898 instead of all 1025~ pokemon, because the newest might be problematic for the API
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`); // fetches pokemon data
        if (!res.ok) throw new Error("Failed to fetch Pokémon");
        return (await res.json()) as PokemonData; // Returns PokemonData which is used to set the state
    }
);

// Reducers which defines how specific parts of the Global State should change
const randomPokemonSlice = createSlice({
    name: "randomPokemon", // prob
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRandomPokemon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRandomPokemon.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload; // Updates data with the new Pokémon
            })
            .addCase(fetchRandomPokemon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Unknown error";
            });
    },
});

export default randomPokemonSlice.reducer;
export const selectRandomPokemon = (state: RootState) => state.randomPokemon; // Copy of the Root State from Store
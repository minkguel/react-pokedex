import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "./api";
import { favoritesApi } from "./favoritesApi";
import randomPokemonReducer from "./randomPokemonSlice";
import uiReducer from "./uiSlice";
import pokemonListReducer from "./pokemonListSlice";

// Stores data on the Client side
export const store = configureStore({
    reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        [favoritesApi.reducerPath]: favoritesApi.reducer,
        randomPokemon: randomPokemonReducer,
        ui: uiReducer,
        pokemonList: pokemonListReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware, favoritesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

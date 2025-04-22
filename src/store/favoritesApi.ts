import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface PokemonFavorite {
    id: string;
    name: string;
}

export const favoritesApi = createApi({
    reducerPath: 'favoritesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    tagTypes: ["Favorites"], // Defines the tag
    endpoints: (builder) => ({
        getFavorites: builder.query<PokemonFavorite[], void>({
            query: () => "favorites",
            providesTags: ["Favorites"], 
        }),
        addFavorite: builder.mutation<PokemonFavorite, PokemonFavorite>({
            query: (favorite) => ({
                url: 'favorites',
                method: 'POST',
                body: favorite,
            }),
            invalidatesTags: ["Favorites"],
        }),
        deleteFavorite: builder.mutation<void, string>({
            query: (id) => ({
                url: `/favorites/${id}`, // Reference to the correct db.json entry
                method: "DELETE",
            }),
            invalidatesTags: ["Favorites"],
            
        }),
    }),
});

// Export hooks for use in components
export const {
    useGetFavoritesQuery,
    useAddFavoriteMutation,
    useDeleteFavoriteMutation,
} = favoritesApi;
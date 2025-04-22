import React from "react";
import { useGetFavoritesQuery, useDeleteFavoriteMutation } from '../store/favoritesApi';

const FavoritesComponent: React.FC = () => {
    const { data: favorites = [], error, isLoading } = useGetFavoritesQuery();
    const [deleteFavorite] = useDeleteFavoriteMutation();

    const handleDeleteFavorite = async (id: string) => {
        const favoriteEntry = favorites?.find(fav => fav.id === id);
        if (favoriteEntry) {
            try {
                console.log("Deleting favorite:", favoriteEntry.id);
                await deleteFavorite(favoriteEntry.id).unwrap();
                console.log("Deleted succesfully!");
            } catch (err) {
                console.error("Error deleting favorite: ", err);
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        console.error("Error loading favorites: ", error);
        return <div>Error loading favorites: {JSON.stringify(error)}</div>
    }

    return (
        <div>
            <h2>Your Favorite Pokémon</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {favorites.map((fav) => {
                    // Use either of the sprite sources
                    const imageUrl = `https://img.pokemondb.net/artwork/large/${fav.name.toLowerCase()}.jpg`;

                    return (
                        <li key={fav.id} style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
                            <img src={imageUrl} alt={fav.name} style={{ width: "80px", height: "80px", marginRight: "1rem" }} />
                            <span style={{ fontSize: "1.2rem", textTransform: "capitalize" }}>{fav.name}</span>
                            <button 
                                onClick={() => handleDeleteFavorite(fav.id)}
                                style={{ marginLeft: "1rem", padding: "0.4rem 0.8rem" }}
                            >
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default FavoritesComponent
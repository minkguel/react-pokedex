import { useParams, Link } from "react-router-dom";
import { useGetPokemonByNameQuery, useGetPokemonSpeciesQuery, useGetEvolutionChainQuery } from "../store/api";
import { useGetFavoritesQuery, useAddFavoriteMutation, useDeleteFavoriteMutation } from "../store/favoritesApi";
import EvolutionLine from "./EvolutionLine";

const PokemonDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Fetch Pokémon details
    const { data, error, isLoading } = useGetPokemonByNameQuery(id!);

    // Fetch evolution chain
    const { data: species } = useGetPokemonSpeciesQuery(data?.name!, {
        skip: !data?.name,
    });
    const chainId = species?.evolution_chain?.url.split("/").at(-2);
    const { data: evolution } = useGetEvolutionChainQuery(chainId!);


    // Fetch favorite Pokémon list
    const { data: favorites = [] } = useGetFavoritesQuery();
    const [addFavorite] = useAddFavoriteMutation();
    const [deleteFavorite] = useDeleteFavoriteMutation();

    if (isLoading) return <p className="text-center mt-4">Loading...</p>;
    if (error || !data) return <p className="text-danger text-center">Error loading Pokémon details!</p>;

    const isCurrentlyFavorite = favorites.some((fav) => fav.id === String(data.id));

    const toggleFavorite = async () => {
        const stringId = String(data.id);
        const favoriteEntry = favorites.find((fav) => fav.id === stringId);

        if (favoriteEntry) {
            await deleteFavorite(stringId).unwrap(); // Makes sure to use the correct ID in db.json
            
        } else {
            await addFavorite({ id: stringId, name: data.name }).unwrap(); // Stores the pokemons API ID and name
        }
    };

    return (
        <div className="container text-center">
            <div className="card shadow-sm p-4">
                <h1 className="card-title text-capitalize">{data.name}</h1>
                <img src={data.sprites.front_default} alt={data.name} className="img-fluid w-25" />

                {/* Pokemon height and weight */}
                <p className="mt-2">Height: {(data.height / 10).toFixed(1)} m</p>
                <p>Weight: {(data.weight / 10).toFixed(1)} kg</p>

                {/* Pokemon types */}
                <strong>Type{data.types.length > 1 ? "s" : ""}:</strong>{" "}
                <div className="mt-2">
                    <strong>Type{data.types.length > 1 ? "s" : ""}:</strong>{" "}
                        {data.types.map((t: any) => {
                            const typeName = t.type.name;
                            return (
                                <span
                                    key={typeName}
                                    className={`badge me-2 text-capitalize badge-${typeName}`}
                                >
                                    {typeName}
                                </span>
                            );
                        })}
                </div>
                
                {/* Add/Remove favorites button */}
                <button className={`btn ${isCurrentlyFavorite ? "btn-danger" : "btn-success"} mt-3`} onClick={toggleFavorite}>
                    {isCurrentlyFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>

                <br />
                <Link to="/" className="btn btn-danger mt-3">Back to list</Link>
            </div>

            {/* Evolution chain */}
            {evolution?.chain && <EvolutionLine chain={evolution.chain}/>}
        </div>
    );
};

export default PokemonDetail;
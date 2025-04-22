import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomPokemon, selectRandomPokemon } from "../store/randomPokemonSlice";
import { AppDispatch } from "../store/store";

const RandomPokemon = () => {
    const dispatch = useDispatch<AppDispatch>();
    const{ data, loading, error } = useSelector(selectRandomPokemon);

    useEffect(() => {
        dispatch(fetchRandomPokemon());
    }, [dispatch]);

    if (loading) return <p className="text-center">Loading random Pokémon</p>;
    if (error) return <p className="text-danger text-center">Error: {error}</p>;

    return (
        data && (
            <div className="card text-center p-3 my-3">
                <h5>Random Pokémon</h5>
                <img src={data.sprites.front_default} alt={data.name} className="mx-auto"/>
                <h4 className="text-capitalize mt-2">{data.name}</h4>
                <p>Type: {data.types.map((t) => t.type.name).join(", ")}</p>
            </div>
        )
    );
};

export default RandomPokemon;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BackToTopButton from "./BackToTopButton";

import { AppDispatch } from "../store/store";
import {
    selectUI,
    setSearchTerm,
    setSortOption,
    setCurrentPage,
} from "../store/uiSlice";

import {
    fetchFullPokemonList,
    selectPokemonList,
} from "../store/pokemonListSlice";

const PokemonList: React.FC = () => {
    // Hooks
    const dispatch = useDispatch<AppDispatch>();
    const { searchTerm, sortOption, currentPage } = useSelector(selectUI);
    const { results, loading, error } = useSelector(selectPokemonList);

    useEffect(() => {
        dispatch(fetchFullPokemonList());
    }, [dispatch]);

    /* Filtering logic */
    const filteredPokemon = results.filter((pokemon) => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    /* Sorting logic */
    const sortedPokemon = filteredPokemon?.slice().sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        const idA = results.findIndex((p) => p.name === a.name) + 1;
        const idB = results.findIndex((p) => p.name === b.name) + 1;

        switch (sortOption) {
            case "name-asc":
                return nameA.localeCompare(nameB);
            case "name-desc":
                return nameB.localeCompare(nameA);
            case "id-desc":
                return idB - idA;
            case "id-asc":
            default:
                return idA - idB;
        }
    });

    const pageSize = 21;
    const startIndex = currentPage * pageSize;
    const currentPagePokemon = sortedPokemon.slice(startIndex, startIndex + pageSize);

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-danger text-center">Error loading Pokémon</p>;

    return (
        <div className="container">
            <h2 className="text-center mb-4">Pokédex</h2>

            { /* Search + Sorting options */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Search for Pokémon..."
                    value={searchTerm}
                    onChange={(e) => {
                        dispatch(setSearchTerm(e.target.value));
                        dispatch(setCurrentPage(0)); // Makes it reset to first page when searching
                    }}
                />

                <select
                    className="form-select w-25"
                    value={sortOption}
                    onChange={(e) => dispatch(setSortOption(e.target.value as any))} // Ask question about any
                >
                    <option value="id-asc">Pokédex number: Low to high</option>
                    <option value="id-desc">Pokédex number: High to low</option>
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                </select>
            </div>

            { /* Pokémon grid view*/ }
            <div className="row">
                {currentPagePokemon?.map((pokemon: { name: string }, index: number) => {
                    const pokemonId = results.findIndex((p: { name: string }) => p.name === pokemon.name) + 1;
                    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

                    return (
                        <div className="col-md-4 mb-3" key={pokemon.name}>
                            <Link to={`/pokemon/${pokemon.name}`} className="text-decoration-none">
                                <div className="card text-center shadow-sm">
                                    <div className="card-body">
                                        <img
                                            src={imageUrl}
                                            alt={pokemon.name}
                                            className="img-fluid w-50 mb-2"
                                        />
                                        <h5 className="card-title text-capitalize">{pokemon.name}</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                <button
                    className="btn btn-outline-danger"
                    onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                    disabled={currentPage === 0}
                >
                    &laquo; Prev
                </button>

                <span className="mx-2 fw-bold">Page {currentPage + 1}</span>

                <button
                    className="btn btn-outline-danger"
                    onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                    disabled={startIndex + pageSize >= sortedPokemon.length}
                >
                    Next &raquo;
                </button>
            </div>
            <BackToTopButton />
        </div>
    );
};

export default PokemonList;
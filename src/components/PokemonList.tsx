import React, { useState } from "react";
import { useGetPokemonListQuery } from "../store/api";
import { Link } from "react-router-dom";
import BackToTopButton from "./BackToTopButton";

const PokemonList: React.FC = () => {
    const pageSize = 21;
    const [page, setPage] = useState(0);
    const { data, error, isLoading } = useGetPokemonListQuery("?limit=1000");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("id-asc");

    if (isLoading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-danger text-center">Error loading Pokémon</p>;

    /* Filtering logic */
    const filteredPokemon = data?.results.filter((pokemon: { name: string }) => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    /* Sorting logic */
    const sortedPokemon = filteredPokemon?.slice().sort((a: { name: string }, b: { name: string }) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        const idA = data.results.findIndex((p: { name: string }) => p.name === a.name) + 1;
        const idB = data.results.findIndex((p: { name: string }) => p.name === b.name) + 1;

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

    const startIndex = page * pageSize;
    const currentPagePokemon = sortedPokemon?.slice(startIndex, startIndex + pageSize);

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
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="form-select w-25"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
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
                    const pokemonId = data.results.findIndex((p: { name: string }) => p.name === pokemon.name) + 1 + (page * 21);
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
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 0}
                >
                    &laquo; Prev
                </button>

                <span className="mx-2 fw-bold">Page {page + 1}</span>

                <button
                    className="btn btn-outline-danger"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={startIndex + pageSize >= (sortedPokemon?.length ?? 0)}
                >
                    Next &raquo;
                </button>
            </div>
            <BackToTopButton />
        </div>
    );
};

export default PokemonList;
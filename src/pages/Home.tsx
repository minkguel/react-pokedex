import React from "react";
import { Link } from "react-router-dom";
import RandomPokemon from "../components/RandomPokemon";

const Home: React.FC = () => {

	return (
		<div className="screen-container text-center mt-5">

			{/* Title and description */}
			<h1 className="display-4">Welcome to the Pokédex</h1>
			<p className="lead">Discover, explore and learn about your favorite Pokémon</p>

			{/* Poké ball image */}
			<div className="d-flex justify-content-center mb-4">
				<img
					src="/pokeball.png"
					alt="Poké ball"
					className="img-fluid"
					style={{ width: "200px" }}
				/>
			</div>

			{/* Button to go to Pokédex */}
			<div className="mt-4">
				<Link to="/pokedex" className="btn btn-danger btn-lg">Explore Pokédex</Link>
			</div>

			{/* Random Pokémon */}
			<div className="container mt-4">
				<RandomPokemon />
			</div>
		</div>
	);
};

export default Home;

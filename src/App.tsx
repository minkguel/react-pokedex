import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import FavoritesComponent from "./components/FavoritesComponent";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div className="pokedex-shell">

      <nav className="navbar navbar-dark bg-white">
        <div className="container">
          <Link to="/" className="navbar-brand text-dark">Pokédex</Link>
          <Link to="/favorites" className="btn btn-light">Favorites</Link>
        </div>
      </nav>
  
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/favorites" element={<FavoritesComponent />} />
        </Routes>
      </div>
    </div>
  );
  
};

export default App;
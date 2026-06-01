import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';

function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (pokemon) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.name === pokemon.name);
      if (isFavorite) {
        return prev.filter(fav => fav.name !== pokemon.name);
      } else {
        return [...prev, pokemon];
      }
    });
  };

  const isFavorite = (pokemonName) => {
    return favorites.some(fav => fav.name === pokemonName);
  };

  return (
    <div className="app-wrapper">
      <Navbar favoritesCount={favorites.length} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pokemon"
            element={
              <PokemonList
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
          <Route
            path="/pokemon/:name"
            element={
              <PokemonDetail
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
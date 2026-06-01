import { Link } from 'react-router-dom';

const TYPE_COLORS = {
    fire: '#FF6B35',
    water: '#4FC3F7',
    grass: '#66BB6A',
    electric: '#FFCA28',
    psychic: '#EC407A',
    ice: '#80DEEA',
    dragon: '#7986CB',
    dark: '#5D4037',
    fairy: '#F48FB1',
    fighting: '#EF5350',
    flying: '#90CAF9',
    poison: '#AB47BC',
    ground: '#FFCC80',
    rock: '#BDBDBD',
    bug: '#9CCC65',
    ghost: '#7E57C2',
    steel: '#78909C',
    normal: '#A5A5A5',
};

function PokemonCard({ pokemon, onFavoriteToggle, isFavorite }) {
    const spriteUrl =
        pokemon.sprites?.other?.['official-artwork']?.front_default ||
        pokemon.sprites?.front_default ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    const types = pokemon.types || [];

    return (
        <div className="pokemon-card">
            <div className="card-header">
                <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
                <button
                    className={`favorite-btn ${isFavorite ? 'favorite-btn--active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        onFavoriteToggle(pokemon);
                    }}
                    title={isFavorite ? 'Favorilerden cikar' : 'Favorilere ekle'}
                >
                    {isFavorite ? '★' : '☆'}
                </button>
            </div>

            <Link to={`/pokemon/${pokemon.name}`} className="card-link">
                <div className="card-image-wrapper">
                    <img
                        src={spriteUrl}
                        alt={pokemon.name}
                        className="pokemon-sprite"
                        loading="lazy"
                    />
                </div>

                <div className="card-body">
                    <h3 className="pokemon-name">
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </h3>

                    <div className="type-tags">
                        {types.map((t) => (
                            <span
                                key={t.type.name}
                                className="type-tag"
                                style={{ backgroundColor: TYPE_COLORS[t.type.name] || '#A5A5A5' }}
                            >
                                {t.type.name}
                            </span>
                        ))}
                    </div>

                    {pokemon.stats && (
                        <div className="stat-row">
                            <span className="stat-label">HP</span>
                            <div className="stat-bar-bg">
                                <div
                                    className="stat-bar-fill"
                                    style={{
                                        width: `${Math.min((pokemon.stats[0].base_stat / 255) * 100, 100)}%`,
                                    }}
                                />
                            </div>
                            <span className="stat-value">{pokemon.stats[0].base_stat}</span>
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
}

export default PokemonCard;
import { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonDetail } from '../services/api';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const TYPE_OPTIONS = [
    'hepsi', 'fire', 'water', 'grass', 'electric', 'psychic',
    'ice', 'dragon', 'dark', 'fairy', 'fighting', 'flying',
    'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'normal',
];

function PokemonList({ favorites, addFavorite, isFavorite, showOnlyFavorites = false }) {
    const [allPokemon, setAllPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('hepsi');
    const [visibleCount, setVisibleCount] = useState(24);

    useEffect(() => {
        if (showOnlyFavorites) {
            setLoading(false);
            return;
        }

        const loadPokemon = async () => {
            setLoading(true);
            setError(null);
            try {
                const list = await fetchPokemonList(150);
                const detailPromises = list.map((p) => fetchPokemonDetail(p.name));
                const details = await Promise.all(detailPromises);
                setAllPokemon(details);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadPokemon();
    }, [showOnlyFavorites]);

    const sourceList = showOnlyFavorites ? favorites : allPokemon;

    const filteredPokemon = sourceList.filter((pokemon) => {
        const nameMatch = pokemon.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const typeMatch =
            selectedType === 'hepsi' ||
            pokemon.types?.some((t) => t.type.name === selectedType);

        return nameMatch && typeMatch;
    });

    const handleRetry = () => {
        setError(null);
        setLoading(true);
        window.location.reload();
    };

    if (loading) return <Loading message="150 Pokemon yukleniyor..." />;
    if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;

    return (
        <div className="list-page">
            <div className="list-header">
                <h1 className="list-title">
                    {showOnlyFavorites ? 'Favori Pokemonlarim' : 'Tum Pokemonlar'}
                </h1>
                <p className="list-count">
                    {filteredPokemon.length} Pokemon bulundu
                </p>
            </div>

            <div className="filters-bar">
                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Pokemon ismi ara..."
                />

                <select
                    className="type-select"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    {TYPE_OPTIONS.map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {filteredPokemon.length === 0 ? (
                <div className="empty-state">
                    {showOnlyFavorites ? (
                        <>
                            <div className="empty-icon">★</div>
                            <h2>Henuz favori eklemediniz</h2>
                            <p>Pokemon listesine giderek favorilerinize Pokemon ekleyebilirsiniz.</p>
                        </>
                    ) : (
                        <>
                            <div className="empty-icon">?</div>
                            <h2>Sonuc bulunamadi</h2>
                            <p>"{searchTerm}" icin herhangi bir Pokemon bulunamadi.</p>
                        </>
                    )}
                </div>
            ) : (
                <>
                    <div className="pokemon-grid">
                        {filteredPokemon.slice(0, visibleCount).map((pokemon) => (
                            <PokemonCard
                                key={pokemon.name}
                                pokemon={pokemon}
                                onFavoriteToggle={addFavorite}
                                isFavorite={isFavorite(pokemon.name)}
                            />
                        ))}
                    </div>

                    {visibleCount < filteredPokemon.length && (
                        <div className="load-more-wrapper">
                            <button
                                className="btn btn-primary"
                                onClick={() => setVisibleCount((prev) => prev + 24)}
                            >
                                Daha Fazla Goster ({filteredPokemon.length - visibleCount} kaldi)
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default PokemonList;
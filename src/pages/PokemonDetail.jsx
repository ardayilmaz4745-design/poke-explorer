import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPokemonDetail } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const TYPE_COLORS = {
    fire: '#FF6B35', water: '#4FC3F7', grass: '#66BB6A',
    electric: '#FFCA28', psychic: '#EC407A', ice: '#80DEEA',
    dragon: '#7986CB', dark: '#5D4037', fairy: '#F48FB1',
    fighting: '#EF5350', flying: '#90CAF9', poison: '#AB47BC',
    ground: '#FFCC80', rock: '#BDBDBD', bug: '#9CCC65',
    ghost: '#7E57C2', steel: '#78909C', normal: '#A5A5A5',
};

const STAT_NAMES = {
    hp: 'HP', attack: 'Atak', defense: 'Savunma',
    'special-attack': 'Oz. Atak', 'special-defense': 'Oz. Savunma', speed: 'Hiz',
};

function PokemonDetail({ addFavorite, isFavorite }) {
    const { name } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('stats');

    useEffect(() => {
        const loadDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchPokemonDetail(name);
                setPokemon(data);
                debugger; // Debug amacli: API'den gelen veriyi incelemek icin
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadDetail();
    }, [name]);

    if (loading) return <Loading message={`${name} yukleniyor...`} />;
    if (error) return <ErrorMessage message={error} onRetry={() => navigate('/pokemon')} />;
    if (!pokemon) return null;

    const mainType = pokemon.types[0]?.type.name || 'normal';
    const accentColor = TYPE_COLORS[mainType] || '#A5A5A5';
    const spriteUrl =
        pokemon.sprites?.other?.['official-artwork']?.front_default ||
        pokemon.sprites?.front_default;

    const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
    const favorite = isFavorite(pokemon.name);

    return (
        <div className="detail-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                &larr; Geri Don
            </button>

            <div className="detail-hero" style={{ '--accent': accentColor }}>
                <div className="detail-info">
                    <span className="detail-id">#{String(pokemon.id).padStart(3, '0')}</span>
                    <h1 className="detail-name">
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </h1>

                    <div className="detail-types">
                        {pokemon.types.map((t) => (
                            <span
                                key={t.type.name}
                                className="type-tag type-tag--large"
                                style={{ backgroundColor: TYPE_COLORS[t.type.name] }}
                            >
                                {t.type.name}
                            </span>
                        ))}
                    </div>

                    <div className="detail-measures">
                        <div className="measure-item">
                            <span className="measure-label">Agirlik</span>
                            <span className="measure-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
                        </div>
                        <div className="measure-item">
                            <span className="measure-label">Boy</span>
                            <span className="measure-value">{(pokemon.height / 10).toFixed(1)} m</span>
                        </div>
                        <div className="measure-item">
                            <span className="measure-label">Toplam</span>
                            <span className="measure-value">{totalStats} puan</span>
                        </div>
                    </div>

                    <button
                        className={`fav-toggle-btn ${favorite ? 'fav-toggle-btn--active' : ''}`}
                        onClick={() => addFavorite(pokemon)}
                        style={{ borderColor: accentColor, color: favorite ? '#fff' : accentColor, backgroundColor: favorite ? accentColor : 'transparent' }}
                    >
                        {favorite ? '★ Favorilerden Cikar' : '☆ Favorilere Ekle'}
                    </button>
                </div>

                <div className="detail-sprite-wrapper">
                    <div
                        className="detail-sprite-bg"
                        style={{ backgroundColor: accentColor + '22' }}
                    ></div>
                    <img src={spriteUrl} alt={pokemon.name} className="detail-sprite" />
                </div>
            </div>

            <div className="detail-tabs">
                {['stats', 'moves', 'abilities'].map((tab) => (
                    <button
                        key={tab}
                        className={`tab-btn ${activeTab === tab ? 'tab-btn--active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                        style={activeTab === tab ? { borderColor: accentColor, color: accentColor } : {}}
                    >
                        {tab === 'stats' ? 'Istatistikler' : tab === 'moves' ? 'Hareketler' : 'Yetenekler'}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {activeTab === 'stats' && (
                    <div className="stats-grid">
                        {pokemon.stats.map((stat) => (
                            <div key={stat.stat.name} className="stat-detail-row">
                                <span className="stat-detail-label">
                                    {STAT_NAMES[stat.stat.name] || stat.stat.name}
                                </span>
                                <span className="stat-detail-value">{stat.base_stat}</span>
                                <div className="stat-detail-bar-bg">
                                    <div
                                        className="stat-detail-bar-fill"
                                        style={{
                                            width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                                            backgroundColor: accentColor,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'moves' && (
                    <div className="moves-grid">
                        {pokemon.moves.slice(0, 20).map((m) => (
                            <span key={m.move.name} className="move-tag">
                                {m.move.name}
                            </span>
                        ))}
                    </div>
                )}

                {activeTab === 'abilities' && (
                    <div className="abilities-list">
                        {pokemon.abilities.map((a) => (
                            <div key={a.ability.name} className="ability-item">
                                <span className="ability-name">
                                    {a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)}
                                </span>
                                {a.is_hidden && (
                                    <span className="hidden-badge">Gizli Yetenek</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PokemonDetail;
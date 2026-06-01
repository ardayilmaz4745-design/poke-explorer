import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPokemonDetail } from '../services/api';
import Loading from '../components/Loading';

const FEATURED_POKEMON = ['pikachu', 'charizard', 'mewtwo', 'eevee', 'snorlax', 'gengar'];

function Home() {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFeatured = async () => {
            try {
                const promises = FEATURED_POKEMON.map((name) => fetchPokemonDetail(name));
                const results = await Promise.all(promises);
                setFeatured(results);
            } catch (err) {
                console.error('One cikan Pokemon yuklenemedi:', err);
            } finally {
                setLoading(false);
            }
        };

        loadFeatured();
    }, []);

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-badge">Kesfet</div>
                    <h1 className="hero-title">
                        Pokemon <span className="hero-accent">Dunyasina</span> Hosgeldiniz
                    </h1>
                    <p className="hero-subtitle">
                        150'den fazla Pokemon'u kesfet, detaylarini incele ve favorilerine ekle.
                        PokeAPI kullanilarak gercek zamanli veri cekilen bu uygulama ile
                        Pokemon dunyasini yeniden yasayin.
                    </p>
                    <div className="hero-actions">
                        <Link to="/pokemon" className="btn btn-primary">
                            Tum Pokemonlari Gor
                        </Link>
                        <Link to="/favorites" className="btn btn-secondary">
                            Favorilerim
                        </Link>
                    </div>
                </div>
            </section>

            <section className="featured-section">
                <div className="section-header">
                    <h2 className="section-title">One Cikanlar</h2>
                    <p className="section-subtitle">En populer Pokemon karakterleri</p>
                </div>

                {loading ? (
                    <Loading message="One cikan Pokemonlar yukleniyor..." />
                ) : (
                    <div className="featured-grid">
                        {featured.map((pokemon) => (
                            <Link
                                to={`/pokemon/${pokemon.name}`}
                                key={pokemon.name}
                                className="featured-card"
                            >
                                <img
                                    src={
                                        pokemon.sprites?.other?.['official-artwork']?.front_default ||
                                        pokemon.sprites?.front_default
                                    }
                                    alt={pokemon.name}
                                    className="featured-sprite"
                                />
                                <span className="featured-name">
                                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            <section className="stats-section">
                <div className="stat-item">
                    <span className="stat-number">150+</span>
                    <span className="stat-desc">Pokemon</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">18</span>
                    <span className="stat-desc">Tip</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">Gercek</span>
                    <span className="stat-desc">Zamanli Veri</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">Sinirsiz</span>
                    <span className="stat-desc">Favori</span>
                </div>
            </section>
        </div>
    );
}

export default Home;
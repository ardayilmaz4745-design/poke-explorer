import { Link, NavLink } from 'react-router-dom';

function Navbar({ favoriteCount }) {
    return (
        <header className="navbar">
            <Link to="/" className="navbar-logo">
                <span className="logo-text">Poke Keşfi</span>
            </Link>

            <nav className="navbar-links">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive ? 'nav-link nav-link--active' : 'nav-link'
                    }
                >
                    Anasayfa
                </NavLink>
                <NavLink
                    to="/pokemon"
                    className={({ isActive }) =>
                        isActive ? 'nav-link nav-link--active' : 'nav-link'
                    }
                >
                    Tum Pokemon
                </NavLink>
                <NavLink
                    to="/favorites"
                    className={({ isActive }) =>
                        isActive ? 'nav-link nav-link--active' : 'nav-link'
                    }
                >
                    Favoriler
                    {favoriteCount > 0 && (
                        <span className="badge">{favoriteCount}</span>
                    )}
                </NavLink>
            </nav>
        </header>
    );
}

export default Navbar;
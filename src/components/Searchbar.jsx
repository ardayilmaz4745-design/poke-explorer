function SearchBar({ value, onChange, placeholder = 'Pokemon ara...' }) {
    return (
        <div className="search-wrapper">
            <span className="search-icon">&#128269;</span>
            <input
                type="text"
                className="search-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
            {value && (
                <button className="search-clear" onClick={() => onChange('')}>
                    x
                </button>
            )}
        </div>
    );
}

export default SearchBar;
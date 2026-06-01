function Loading({ message = 'Yukleniyor...' }) {
    return (
        <div className="loading-container">
            <div className="pokeball-spinner">
                <div className="pokeball-top"></div>
                <div className="pokeball-middle">
                    <div className="pokeball-button"></div>
                </div>
                <div className="pokeball-bottom"></div>
            </div>
            <p className="loading-text">{message}</p>
        </div>
    );
}

export default Loading;
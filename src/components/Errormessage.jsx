function ErrorMessage({ message, onRetry }) {
    return (
        <div className="error-container">
            <div className="error-icon">!</div>
            <h2 className="error-title">Bir Hata Olustu</h2>
            <p className="error-message">{message}</p>
            {onRetry && (
                <button className="retry-btn" onClick={onRetry}>
                    Tekrar Dene
                </button>
            )}
        </div>
    );
}

export default ErrorMessage;
import "./Favorites.css";

const Favorites = ({
  favorites,
  currentQuote,
  onAddFavorite,
  onRemoveFavorite,
}) => {
  const isFavorited = favorites.some(
    (fav) =>
      fav.quote === currentQuote?.quote && fav.author === currentQuote?.author,
  );

  const toggleFavorite = () => {
    if (isFavorited) {
      onRemoveFavorite(currentQuote);
    } else {
      onAddFavorite(currentQuote);
    }
  };

  return (
    <div className="favorites-section">
      <button
        className={`favorite-btn ${isFavorited ? "favorited" : ""}`}
        onClick={toggleFavorite}
        title={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isFavorited ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          width="24"
          height="24"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span>{favorites.length}</span>
      </button>
    </div>
  );
};

export default Favorites;

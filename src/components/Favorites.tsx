interface Quote {
  quote: string;
  author: string;
  id?: number;
  [key: string]: string | number | undefined;
}

interface FavoritesProps {
  favorites: Quote[];
  currentQuote: Quote | null;
  onAddFavorite: (quote: Quote) => void;
  onRemoveFavorite: (quote: Quote) => void;
}

const Favorites: React.FC<FavoritesProps> = ({
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
    if (!currentQuote) return;
    if (isFavorited) {
      onRemoveFavorite(currentQuote);
    } else {
      onAddFavorite(currentQuote);
    }
  };

  return (
    <div className="flex justify-center my-2">
      <button
        className={`flex items-center gap-3 px-7 py-2.5 text-sm font-bold uppercase tracking-wider transition-transform duration-300 ease-in-out rounded-full border-2 shadow-lg text-white bg-white/10 border-rose-500/50 hover:bg-rose-600/15 hover:border-rose-500 hover:scale-105 ${
          isFavorited
            ? "bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 border-white shadow-2xl scale-110"
            : ""
        }`}
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

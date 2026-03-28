import React from "react";
import { FaTimes } from "react-icons/fa";

interface Quote {
  quote: string;
  author: string;
  id?: number;
}

interface Props {
  favorites: Quote[];
  onClose: () => void;
  onRemove: (q: Quote) => void;
}

const FavoritesModal: React.FC<Props> = ({ favorites, onClose, onRemove }) => {
  const copyQuote = async (q: Quote) => {
    try {
      await navigator.clipboard.writeText(`"${q.quote}" — ${q.author}`);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative w-full max-w-2xl mx-4 bg-slate-900/95 border border-white/10 rounded-2xl p-6 backdrop-blur-md text-slate-100 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Your Favorites</h2>
          <button
            onClick={onClose}
            aria-label="Close favorites"
            className="text-slate-400 hover:text-slate-200"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {favorites.length === 0 ? (
          <p className="text-sm text-slate-400">
            No favorites yet. Add some ❤️
          </p>
        ) : (
          <ul className="space-y-4 max-h-80 overflow-auto pr-2">
            {favorites.map((f, idx) => (
              <li
                key={`${f.quote}-${idx}`}
                className="bg-white/3 p-4 rounded-lg"
              >
                <p className="text-sm md:text-base text-slate-100">
                  "{f.quote}"
                </p>
                <p className="text-xs text-slate-400 mt-2">— {f.author}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => copyQuote(f)}
                    className="text-xs px-3 py-1 rounded bg-white/5 hover:bg-white/10"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => onRemove(f)}
                    className="text-xs px-3 py-1 rounded bg-rose-600/20 hover:bg-rose-600/30"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavoritesModal;

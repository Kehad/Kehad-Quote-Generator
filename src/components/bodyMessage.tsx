import { useEffect, useState } from "react";
import FavoritesModal from "./FavoritesModal";
import AutoType from "./autoType";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaCopy, FaCheckCircle } from "react-icons/fa";

interface Quote {
  quote: string;
  author: string;
  id?: number;
}

type CopyStatus = "idle" | "success" | "error";

const BodyMessage: React.FC = () => {
  const [quoteObject, setQuoteObject] = useState<Quote | null>(null);
  const [errorState, setErrorState] = useState<boolean>(false);
  const [accentColor, setAccentColor] = useState<string>("#818cf8");
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showFavoritesModal, setShowFavoritesModal] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Quote[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const generateRandomColor = (): string => {
    const hues = [210, 250, 280, 310, 20, 160]; // Modern vibrant hues
    const randomHue = hues[Math.floor(Math.random() * hues.length)];
    return `hsla(${randomHue}, 70%, 60%, 0.4)`;
  };

  const fetchQuote = async (): Promise<void> => {
    setIsLoading(true);
    setAccentColor(generateRandomColor());
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = (await response.json()) as Quote;
      setQuoteObject(data);
      setErrorState(false);
    } catch {
      setErrorState(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const copyToClipboard = async (): Promise<void> => {
    if (!quoteObject) return;
    try {
      await navigator.clipboard.writeText(
        `"${quoteObject.quote}" — ${quoteObject.author}`,
      );
      setCopyStatus("success");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
    }
  };

  const getShareText = (): string => {
    if (!quoteObject) return "";
    return `"${quoteObject.quote}" — ${quoteObject.author}`;
  };

  const shareToTwitter = (): void => {
    if (typeof window === "undefined") return;
    const text = getShareText();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text,
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareToLinkedIn = (): void => {
    if (typeof window === "undefined") return;
    const text = getShareText();
    const shareUrl = window.location.href;
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      shareUrl,
    )}&title=${encodeURIComponent(text)}&summary=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareToFacebook = (): void => {
    if (typeof window === "undefined") return;
    const text = getShareText();
    const shareUrl = window.location.href;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl,
    )}&quote=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareToInstagram = async (): Promise<void> => {
    const text = getShareText();
    // Instagram doesn't support prefilled text via web share URLs reliably.
    // Prefer the Web Share API on supported devices, otherwise copy text and open IG.
    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // fall through to fallback
      }
    }

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
    if (typeof window !== "undefined") {
      window.open(
        "https://www.instagram.com/",
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  const toggleFavorite = (quote: Quote) => {
    const isFav = favorites.some((f) => f.quote === quote.quote);
    if (isFav) {
      setFavorites(favorites.filter((f) => f.quote !== quote.quote));
    } else {
      setFavorites([...favorites, quote]);
    }
  };

  const removeFavorite = (quote: Quote) => {
    setFavorites((prev) =>
      prev.filter((f) => f.quote !== quote.quote || f.author !== quote.author),
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-500/30 flex items-center justify-center p-6 font-sans">
      {/* Background Glow */}
      <div
        className="fixed inset-0 transition-colors duration-1000 ease-in-out -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor} 0%, transparent 50%)`,
        }}
      />

      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Header Section */}
        <section className="md:col-span-3 flex flex-col md:flex-row justify-between items-end mb-4 px-2">
          <div>
            <h1 className="text-4xl font-light tracking-tight italic">
              thought
              <span className="font-bold not-italic text-indigo-400">flow</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest">
              Curation 2.6
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={() => setShowFavoritesModal(true)}
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium backdrop-blur-sm hover:bg-white/10"
              aria-label="View favorites"
            >
              Favorites: {favorites.length}
            </button>
          </div>
        </section>

        {/* Main Quote Card */}
        <section className="md:col-span-2 relative group overflow-hidden rounded-[2.5rem] bg-white/3 border border-white/10 p-8 md:p-12 backdrop-blur-md shadow-2xl transition-all hover:border-white/20">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : errorState ? (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <p className="text-slate-400 mb-4">
                Failed to load a quote. Check your connection and try again.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={fetchQuote}
                  className="bg-white text-black font-bold px-4 py-2 rounded-2xl hover:bg-indigo-50 transition-all"
                >
                  Retry
                </button>
                <button
                  onClick={() => setShowFavoritesModal(true)}
                  className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-medium backdrop-blur-sm hover:bg-white/10"
                >
                  View Favorites
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-between gap-8">
              <div className="space-y-6">
                <span className="text-6xl font-serif text-indigo-500/40 block h-8 leading-none">
                  “
                </span>
                <p className="text-2xl md:text-4xl font-medium leading-tight tracking-tight text-slate-50">
                  {quoteObject?.quote ? (
                    <AutoType
                      text={quoteObject.quote}
                      className="text-2xl md:text-4xl font-medium leading-tight tracking-tight text-slate-50"
                    />
                  ) : null}
                </p>
                <p className="text-lg text-slate-400 font-light">
                  — {quoteObject?.author}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                <button
                  onClick={fetchQuote}
                  className="flex-1 bg-white text-black font-bold py-4 rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 text-sm uppercase tracking-tighter"
                >
                  New Insight
                </button>
                <button
                  onClick={() => quoteObject && toggleFavorite(quoteObject)}
                  className={`p-4 rounded-2xl border transition-all ${favorites.some((f) => f.quote === quoteObject?.quote) ? "bg-rose-500/20 border-rose-500/50 text-rose-400" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                >
                  {favorites.some((f) => f.quote === quoteObject?.quote)
                    ? "❤️"
                    : "🤍"}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Side Controls/Meta */}
        <aside className="space-y-4">
          <div className="rounded-4xl bg-white/3 border border-white/10 p-6 backdrop-blur-md">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              Actions
            </h3>
            <button
              onClick={copyToClipboard}
              className="w-full text-center flex items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <span className="text-md text-center">
                {copyStatus === "success" ?  <FaCheckCircle /> : <FaCopy />} 
               
              </span>
             
            </button>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={shareToTwitter}
                aria-label="Share on Twitter"
                className="w-full p-2 rounded bg-blue-500/10 hover:bg-blue-500/20 flex items-center justify-center"
              >
                <FaTwitter size={18} className="text-sky-400" />
              </button>

              <button
                onClick={shareToLinkedIn}
                aria-label="Share on LinkedIn"
                className="w-full p-2 rounded bg-sky-600/10 hover:bg-sky-600/20 flex items-center justify-center"
              >
                <FaLinkedin size={18} className="text-sky-600" />
              </button>

              <button
                onClick={shareToFacebook}
                aria-label="Share on Facebook"
                className="w-full p-2 rounded bg-blue-700/10 hover:bg-blue-700/20 flex items-center justify-center"
              >
                <FaFacebook size={18} className="text-blue-500" />
              </button>

              <button
                onClick={() => shareToInstagram()}
                aria-label="Share on Instagram"
                className="w-full p-2 rounded bg-pink-500/10 hover:bg-pink-500/20 flex items-center justify-center"
              >
                <FaInstagram size={18} className="text-pink-400" />
              </button>
            </div>
          </div>

          <div className="rounded-4xl bg-white/3 border border-white/10 p-6 backdrop-blur-md">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-slate-500 uppercase block mb-2 font-bold">
                  Language
                </label>
                <select className="w-full bg-transparent text-sm border-b border-white/10 pb-1 focus:outline-none">
                  <option value="en" className="bg-slate-900">
                    English
                  </option>
                  <option value="es" className="bg-slate-900">
                    Spanish
                  </option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-slate-500 uppercase block mb-2 font-bold">
                  Curation
                </label>
                <select className="w-full bg-transparent text-sm border-b border-white/10 pb-1 focus:outline-none">
                  <option className="bg-slate-900">All Masterpieces</option>
                  <option className="bg-slate-900">Wisdom Only</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        {/* Footer */}
        <footer className="md:col-span-3 text-center py-6">
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">
            Designed by{" "}
            <a
              href="https://www.linkedin.com/in/kehinde-adigun-/"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              @Kehad
            </a>
          </p>
        </footer>
      </main>
      {showFavoritesModal && (
        <FavoritesModal
          favorites={favorites}
          onClose={() => setShowFavoritesModal(false)}
          onRemove={(q) => removeFavorite(q)}
        />
      )}
    </div>
  );
};

export default BodyMessage;

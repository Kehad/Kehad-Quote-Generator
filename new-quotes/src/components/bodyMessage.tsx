import { useEffect, useState } from "react";

interface Quote {
  quote: string;
  author: string;
  id?: number;
  [key: string]: any;
}

type CopyStatus = "idle" | "success" | "error";

const BodyMessage: React.FC = () => {
  const [quoteObject, setQuoteObject] = useState<Quote | null>(null);
  const [errorState, setErrorState] = useState<boolean>(false);
  const [numColor, setNumColor] = useState<string>("#667eea");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [favorites, setFavorites] = useState<Quote[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  const generateRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const fetchQuote = async (): Promise<void> => {
    setIsLoading(true);
    setNumColor(generateRandomColor());

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

  useEffect(() => {
    if (copyStatus === "success" || copyStatus === "error") {
      const timer = setTimeout(() => setCopyStatus("idle"), 1000);
      return () => clearTimeout(timer);
    }
  }, [copyStatus]);

  const handleAddFavorite = (quote: Quote): void => {
    if (
      favorites.some(
        (item) => item.quote === quote.quote && item.author === quote.author,
      )
    ) {
      return;
    }
    setFavorites((current) => [...current, quote]);
  };

  const handleCategoryChange = (category: string): void => {
    setSelectedCategory(category);
    fetchQuote();
  };

  const handleLanguageChange = (language: string): void => {
    setSelectedLanguage(language);
    fetchQuote();
  };

  const copyToClipboard = async (): Promise<void> => {
    if (!quoteObject) {
      setCopyStatus("error");
      return;
    }

    try {
      const text = `"${quoteObject.quote}" ~~ ${quoteObject.author}`;
      await navigator.clipboard.writeText(text);
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-slate-100 py-12 px-4 transition-all duration-500"
      style={{ boxShadow: `inset 0 0 120px ${numColor}20` }}
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-12 text-center space-y-3">
          <h1 className="text-6xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">
            Daily Inspiration
          </h1>
          <p className="text-xl text-amber-100 font-light">
            Wisdom that moves your soul
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="relative group">
            {/* Background Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-[2rem] blur opacity-40 group-hover:opacity-60 transition duration-500"></div>

            {/* Main Card */}
            <div className="relative rounded-[2rem] border-2 border-amber-400 bg-gradient-to-br from-white via-amber-50 to-white p-10 shadow-[0_30px_60px_rgba(217,119,6,0.15)]">
              {/* Decorative Corner Elements */}
              <div className="absolute top-6 right-6 flex gap-3 z-20">
                <button
                  className="group/btn h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center hover:from-amber-500 hover:to-amber-600"
                  onClick={copyToClipboard}
                  aria-label="Copy quote"
                  title="Copy quote"
                >
                  <span className="group-hover/btn:animate-pulse">📋</span>
                </button>
                <button
                  className="group/btn h-12 w-12 rounded-xl bg-gradient-to-br from-rose-400 to-rose-500 text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center hover:from-rose-500 hover:to-rose-600"
                  onClick={() => quoteObject && handleAddFavorite(quoteObject)}
                  title="Add to favorites"
                >
                  <span
                    className={`transition-transform ${favorites.some((fav) => fav.quote === quoteObject?.quote) ? "text-rose-300 scale-125" : ""}`}
                  >
                    ♡
                  </span>
                </button>
              </div>

              {/* Quote Content */}
              <div className="pt-8 pb-8 space-y-8">
                {/* Opening Quote Mark */}
                <div className="text-6xl text-amber-300 opacity-50 leading-none">
                  ❝
                </div>

                {/* Main Quote Text */}
                <p className="text-center text-4xl md:text-5xl font-black text-amber-900 leading-tight tracking-tight">
                  {quoteObject?.quote ?? "No quote yet."}
                </p>

                {/* Decorative Divider */}
                <div className="flex items-center justify-center gap-4">
                  <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent rounded-full"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent rounded-full"></div>
                </div>

                {/* Author Attribution */}
                <div className="text-center space-y-2">
                  <p className="text-sm font-semibold text-amber-600 uppercase tracking-widest">
                    Author
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-amber-800">
                    {quoteObject?.author ?? "Unknown"}
                  </p>
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className="border-t-2 border-amber-200 pt-8 flex items-center justify-between flex-wrap gap-4">
                {/* Share Buttons */}
                <div className="flex gap-2.5">
                  <button
                    className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center hover:from-blue-500 hover:to-blue-600"
                    title="Share on X"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quoteObject?.quote}" - ${quoteObject?.author}`)}`,
                        "_blank",
                      )
                    }
                  >
                    𝕏
                  </button>
                  <button
                    className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center hover:from-blue-700 hover:to-blue-800"
                    title="Share on LinkedIn"
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=yourquoteapp.com&title=${encodeURIComponent(`"${quoteObject?.quote}" - ${quoteObject?.author}`)}`,
                        "_blank",
                      )
                    }
                  >
                    in
                  </button>
                </div>

                {/* New Quote Button */}
                <button
                  className="group/newquote relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-8 py-3 text-sm font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-amber-300"
                  onClick={() => {
                    fetchQuote();
                    setNumColor(generateRandomColor());
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    ✨ New Quote
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 opacity-0 group-hover/newquote:opacity-100 transition duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-amber-300/30"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-400 animate-spin"></div>
            </div>
          </div>
        )}

        {copyStatus !== "idle" && (
          <div
            className={`mt-6 rounded-2xl border p-4 text-sm font-medium backdrop-blur-sm ${
              copyStatus === "success"
                ? "border-emerald-400/50 bg-emerald-500/20 text-emerald-100"
                : "border-rose-400/50 bg-rose-500/20 text-rose-100"
            }`}
          >
            {copyStatus === "success"
              ? "✓ Quote copied to clipboard!"
              : "✗ Failed to copy quote."}
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyMessage;

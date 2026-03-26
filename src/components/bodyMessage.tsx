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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-cyan-700 text-slate-100 py-8 px-4"
      style={{ boxShadow: `inset 0 0 120px ${numColor}` }}
    >
      <div className="mx-auto w-full max-w-3xl space-y-5 rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
        <header className="space-y-2 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Quote Generator
          </h1>
          <p className="text-sm text-slate-200">
            Discover daily inspiration with one click
          </p>
        </header>

        {errorState && (
          <div className="rounded-xl border border-red-300/40 bg-red-500/20 p-3 text-red-100">
            Unable to fetch quote. Please check your connection and try again.
          </div>
        )}

        {copyStatus !== "idle" && (
          <div
            className={`rounded-xl border p-3 text-sm ${
              copyStatus === "success"
                ? "border-emerald-300 bg-emerald-500/20 text-emerald-100"
                : "border-rose-300 bg-rose-500/20 text-rose-100"
            }`}
          >
            {copyStatus === "success"
              ? "Quote copied!"
              : "Failed to copy quote."}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-white/20 bg-white/10 p-3">
            <label className="block text-sm font-medium mb-2">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full rounded border border-white/20 bg-white/10 px-3 py-2 text-white"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>

          <div className="rounded-lg border border-white/20 bg-white/10 p-3">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full rounded border border-white/20 bg-white/10 px-3 py-2 text-white"
            >
              <option value="All">All Categories</option>
              <option value="inspiration">Inspiration</option>
              <option value="motivation">Motivation</option>
              <option value="wisdom">Wisdom</option>
            </select>
          </div>
        </div>

        <div className="rounded-lg border border-white/20 bg-white/10 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Favorites ({favorites.length})
            </span>
            <button
              onClick={() => quoteObject && handleAddFavorite(quoteObject)}
              className="rounded px-3 py-1 text-sm bg-red-500 hover:bg-red-600 transition"
            >
              ?? Add to Favorites
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/25 bg-slate-900/30 p-5 shadow-inner backdrop-blur">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-end">
                <button
                  className="rounded-lg border border-slate-300/30 bg-white/15 px-3 py-2 text-slate-100 transition hover:bg-white/30"
                  onClick={copyToClipboard}
                  aria-label="Copy quote"
                >
                  Copy
                </button>
              </div>

              <p className="text-center text-2xl font-semibold leading-relaxed text-white md:text-3xl">
                &ldquo;{quoteObject?.quote ?? "No quote yet."}&rdquo;
              </p>

              <div className="mt-4 text-center">
                <p className="text-lg text-slate-300 italic">
                  � {quoteObject?.author ?? "Unknown"}
                </p>
              </div>

              <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  className="rounded-xl border-2 border-white/40 bg-blue-500 px-5 py-2 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-blue-600 active:scale-95"
                  onClick={() => {
                    fetchQuote();
                    setNumColor(generateRandomColor());
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  New Quote
                </button>

                <button
                  className={`rounded-xl border px-5 py-2 text-sm font-semibold transition ${
                    isHovered
                      ? "border-white bg-white/30 text-slate-900"
                      : "border-white/30 bg-white/10 text-white"
                  }`}
                  onClick={() => setIsHovered((value) => !value)}
                >
                  {isHovered ? "Release" : "Hover"}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="rounded-xl border border-white/20 bg-black/20 p-3 text-center text-xs text-slate-200">
          by{" "}
          <a
            className="underline"
            href="https://www.linkedin.com/in/kehinde-adigun-/"
            target="_blank"
            rel="noreferrer"
          >
            @Kehad
          </a>
        </div>
      </div>
    </div>
  );
};

export default BodyMessage;

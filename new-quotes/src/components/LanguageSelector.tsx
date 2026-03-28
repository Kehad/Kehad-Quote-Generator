interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "pt", name: "Portuguese" },
    { code: "it", name: "Italian" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 px-6 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
      <label
        htmlFor="language-select"
        className="text-sm font-bold uppercase tracking-wider text-slate-300 whitespace-nowrap"
      >
        🌍 Language
      </label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="flex-1 sm:flex-none h-10 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 focus:border-blue-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/20 hover:border-white/30"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;

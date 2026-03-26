const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "pt", name: "Portuguese" },
    { code: "it", name: "Italian" },
  ];

  return (
    <div className="flex items-center justify-center gap-3 my-2 p-3 rounded-xl bg-white/10 backdrop-blur-sm animate-[slideIn_0.5s_ease-out]">
      <label
        htmlFor="language-select"
        className="font-bold text-sm uppercase tracking-wider text-white whitespace-nowrap"
      >
        Language:
      </label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="h-10 rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold uppercase tracking-wide text-white transition duration-300 ease-in-out hover:border-white/50 focus:border-white focus:bg-white/20 focus:outline-none"
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

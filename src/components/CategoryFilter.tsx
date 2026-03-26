interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const categories = [
    "All",
    "Inspirational",
    "Motivational",
    "Success",
    "Life",
    "Wisdom",
    "Funny",
    "Leadership",
  ];

  return (
    <div className="mb-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm text-center animate-[slideIn_0.5s_ease-out]">
      <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-white text-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
        Filter by Category:
      </label>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${
              selectedCategory === category
                ? "border-white bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105"
                : "border-white/30 bg-white/10 text-white hover:border-white/70 hover:bg-white/20"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

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
    <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <label className="block mb-4 text-sm font-bold uppercase tracking-wider text-slate-300">
        📂 Filter by Category
      </label>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${
              selectedCategory === category
                ? "border border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50 scale-105"
                : "border border-white/20 bg-white/10 text-slate-200 hover:border-white/40 hover:bg-white/20"
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

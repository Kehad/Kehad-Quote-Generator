import "./CategoryFilter.css";

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
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
    <div className="category-filter">
      <label>Filter by Category:</label>
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${
              selectedCategory === category ? "active" : ""
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

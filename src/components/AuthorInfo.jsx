import "./AuthorInfo.css";

const AuthorInfo = ({ author, onAuthorClick }) => {
  return (
    <div className="author-info">
      <p className="author-label">Author</p>
      <h3
        className="author-name"
        onClick={() => onAuthorClick(author)}
        title="Click to see more quotes from this author"
      >
        {author}
      </h3>
      <p className="author-hint">Click author name for more quotes</p>
    </div>
  );
};

export default AuthorInfo;

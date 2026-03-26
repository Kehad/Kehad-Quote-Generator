const AuthorInfo = ({ author, onAuthorClick }) => {
  return (
    <div className="text-center rounded-xl p-4 bg-white/10 backdrop-blur-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-white/80">
        Author
      </p>
      <h3
        className="cursor-pointer text-lg font-semibold text-white hover:text-indigo-200"
        onClick={() => onAuthorClick(author)}
        title="Click to see more quotes from this author"
      >
        {author}
      </h3>
      <p className="mt-1 text-xs text-white/70">
        Click author name for more quotes
      </p>
    </div>
  );
};

export default AuthorInfo;

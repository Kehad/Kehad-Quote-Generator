const Logo = () => {
  return (
    <div className="flex justify-center mb-6 animate-[fadeInScale_0.6s_ease-out]">
      <svg
        className="h-20 w-20 filter drop-shadow-[0_4px_12px_rgba(102,126,234,0.3)] transition-transform duration-300 hover:scale-110 hover:rotate-3 hover:drop-shadow-[0_6px_20px_rgba(102,126,234,0.5)]"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#logoGradient)"
          opacity="0.2"
        />

        {/* Quote mark */}
        <text
          x="50"
          y="55"
          fontSize="60"
          fontWeight="bold"
          textAnchor="middle"
          fill="url(#logoGradient)"
          fontFamily="Georgia, serif"
        >
          "
        </text>

        {/* Decorative lines */}
        <line
          x1="20"
          y1="30"
          x2="40"
          y2="30"
          stroke="url(#logoGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="60"
          y1="70"
          x2="80"
          y2="70"
          stroke="url(#logoGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;

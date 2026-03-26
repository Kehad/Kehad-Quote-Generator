const ShareButtons = ({ quote, author, numColor }) => {
  const quoteText = `"${quote}" ~~ ${author}`;
  const encodedQuote = encodeURIComponent(quoteText);

  const shareToFacebook = () => {
    const facebookURL = `https://www.facebook.com/sharer/sharer.php?quote=${encodedQuote}`;
    window.open(facebookURL, "_blank");
  };

  const shareToLinkedIn = () => {
    const linkedinURL = `https://www.linkedin.com/sharing/share-offsite/?url=yourquoteapp.com&title=${encodedQuote}`;
    window.open(linkedinURL, "_blank");
  };

  const shareViaEmail = () => {
    const subject = "Check out this quote!";
    const body = `I found this inspiring quote:\n\n${quoteText}\n\nShare your thoughts!`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(quoteText);
      alert("Quote copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareStyle = {
    backgroundColor: numColor,
    borderColor: numColor,
    color: "#fff",
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 my-4">
      <button
        className="flex h-10 min-w-[42px] items-center justify-center rounded-lg px-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl active:scale-95"
        onClick={shareToFacebook}
        style={shareStyle}
        title="Share on Facebook"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
        </svg>
      </button>

      <button
        className="flex h-10 min-w-[42px] items-center justify-center rounded-lg px-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl active:scale-95"
        onClick={shareToLinkedIn}
        style={shareStyle}
        title="Share on LinkedIn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.945v5.442h-3.554s.05-8.81 0-9.728h3.554v1.375c.427-.659 1.191-1.598 2.897-1.598 2.117 0 3.704 1.385 3.704 4.362v5.589zM5.337 9.021c-1.144 0-1.915-.759-1.915-1.71 0-.956.77-1.71 1.964-1.71 1.192 0 1.915.754 1.94 1.71 0 .951-.748 1.71-1.989 1.71zm1.575 11.431H3.816V9.724h3.096v10.728zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
        </svg>
        {/* LinkedIn */}
      </button>

      <button
        className="flex h-10 min-w-[42px] items-center justify-center rounded-lg px-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl active:scale-95"
        onClick={shareViaEmail}
        style={shareStyle}
        title="Share via Email"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
        </svg>
        {/* Email */}
      </button>

      <button
        className="flex h-10 min-w-[42px] items-center justify-center rounded-lg px-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl active:scale-95"
        onClick={copyToClipboard}
        style={shareStyle}
        title="Copy to Clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
        </svg>
        {/* Copy */}
      </button>
    </div>
  );
};

export default ShareButtons;

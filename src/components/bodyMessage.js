import { useEffect, useState } from "react";
import Layout from "../layout/layout";
// import AutoType from "./autoType";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "./bodyMessage.css";

const BodyMessage = () => {
  const [quoteObject, setQuoteObject] = useState("");
  const [errorState, setErrorState] = useState(false);
  const [numColor, setNumColor] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [copySuccess, setCopySuccess] = useState(null);

  const alertStyles = {
    position: "absolute",
    top: "5%",
    right: "5%",
    fontSize: "16px",
  };
  const newColor = {
    color: "#fff",
    borderColor: numColor,
    backgroundColor: numColor,
    cursor: "pointer",
  };
  const newColorHover = {
    // Define the styles for the hover state
    borderColor: numColor,
    backgroundColor: "#fff",
    color: numColor,
  };

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuoteObject(data);
      setErrorState(false);
    } catch (error) {
      setErrorState(true);
    }
  };

  
  // posting to twitter function
  const tweetPost = () => {
    var tweetText = quoteObject.content;
    var encodedTweetText = encodeURIComponent(tweetText);
    var twitterURL = `https://twitter.com/intent/tweet?url=&text=${encodedTweetText}`;
    window.location.href = twitterURL;
  };
  // posting to whatsapp function
  const handleStatusUpdate = () => {
    const statusMessage = quoteObject.content;
    const whatsappLink = `whatsapp://send?text=${encodeURIComponent(
      statusMessage
    )}`;
    window.location.href = whatsappLink;
  };

  function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
      // console.log(color);
    }
    return color;
  }

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleButtonClick = () => {
    setNumColor(generateRandomColor());
  };
  setTimeout(() => {
    if (errorState === true) setErrorState(false);
  }, 800);

  useEffect(() => {

    setTimeout(() => {
      setCopySuccess(null);
      console.log('setCopySuccess null')
    }, 800)
  },[copySuccess])

  useEffect(() => {
    fetchQuote();
    handleButtonClick();
  }, []);

   const copyToClipboard = async () => {
     try {
       if (quoteObject) {
         console.log('to copy ')
         setCopySuccess(false);
       } else {
         console.log("don't copy");
       setCopySuccess(true);
         return;
       }
       const copying = `"${quoteObject.content}" ~~ ${quoteObject.author}`;
       await navigator.clipboard.writeText(copying);
      //  setCopySuccess(true);
     } catch (err) {
      //  setCopySuccess(false);
     }
   };

  return (
    <>
      <Layout bkgColor={numColor} onClick={() => handleMouseLeave()}>
        {errorState && (
          <Alert variant="danger" style={alertStyles} dismissible>
            You're unable to get a new quote! Check your internet connection and
            try again
          </Alert>
        )}

        {copySuccess === true && (
          <Alert variant="danger" style={alertStyles} dismissible>
            Failed to copy
          </Alert>
        )}
        {copySuccess === false && (
          <Alert variant="success" style={alertStyles} dismissible>
            "Copied"
          </Alert>
        )}

        <div id="quote-box" className="header">
          <div className="copy-box" title="Copy text" onClick={copyToClipboard}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="copy"
                fill={numColor}
              >
                <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" />
              </svg>
            </a>
          </div>
          <p id="quote-text">
            <span>"</span>
            {quoteObject.content}
          </p>
          {/* {error && alert('ddsuccdccd')} */}
          <h3 id="author">~~ {quoteObject.author}</h3>

          <div id="author-remark">
            <div id="author-link">
              <a
                href={`https://twitter.com/intent/tweet?url=&text=${quoteObject.content}`}
                id="tweet-quote"
                onClick={tweetPost}
                style={newColor}
                title="Tweet this quote!"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#fff"
                >
                  <path d="M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z"></path>
                </svg>
              </a>
              <a
                href={`whatsapp://send?text=${encodeURIComponent(
                  quoteObject.content
                )}`}
                id="whatsapp-quote"
                style={newColor}
                title="Share to your Whatsapp"
                onClick={handleStatusUpdate}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="#fff"
                >
                  <path d="M 14.21875 5 C 13.539063 5 12.96875 5.570313 12.96875 6.25 C 12.96875 7.761719 12.203125 8.816406 11.34375 9.5625 C 10.914063 9.9375 10.453125 10.222656 10.125 10.40625 C 9.960938 10.496094 9.84375 10.550781 9.75 10.59375 C 9.703125 10.617188 9.679688 10.648438 9.65625 10.65625 C 9.632813 10.664063 9.535156 10.6875 9.625 10.65625 C 9.140625 10.847656 8.8125 11.296875 8.8125 11.8125 L 8.8125 14.03125 C 8.8125 14.710938 9.382813 15.28125 10.0625 15.28125 L 11.1875 15.28125 L 11.1875 20.5 C 11.1875 20.855469 11.1875 22.34375 11.875 23.875 C 12.5625 25.40625 14.136719 27 16.71875 27 C 20.652344 27 22.605469 25.441406 22.75 25.3125 C 23.019531 25.074219 23.1875 24.722656 23.1875 24.375 L 23.1875 21.71875 C 23.1875 21.273438 22.921875 20.84375 22.53125 20.625 C 22.15625 20.417969 21.699219 20.460938 21.3125 20.6875 L 21.28125 20.65625 C 21.28125 20.65625 21.25 20.6875 21.25 20.6875 C 21.179688 20.726563 20.09375 21.34375 18.90625 21.34375 C 18.289063 21.34375 18.246094 21.167969 18.125 20.9375 C 18.003906 20.707031 17.96875 20.3125 17.96875 20.40625 L 17.96875 15.46875 L 21.0625 15.46875 C 21.742188 15.46875 22.3125 14.902344 22.3125 14.21875 L 22.3125 11.21875 C 22.3125 10.535156 21.742188 9.96875 21.0625 9.96875 L 17.96875 9.96875 L 17.96875 6.25 C 17.96875 5.570313 17.398438 5 16.71875 5 Z M 14.78125 7 L 15.96875 7 L 15.96875 11.96875 L 20.3125 11.96875 L 20.3125 13.46875 L 15.96875 13.46875 L 15.96875 20.40625 C 15.96875 20.578125 15.976563 21.164063 16.34375 21.875 C 16.710938 22.585938 17.636719 23.34375 18.90625 23.34375 C 19.808594 23.34375 20.589844 23.128906 21.1875 22.90625 L 21.1875 23.9375 C 20.925781 24.144531 19.761719 25 16.71875 25 C 14.878906 25 14.203125 24.136719 13.71875 23.0625 C 13.234375 21.988281 13.1875 20.707031 13.1875 20.5 L 13.1875 13.28125 L 10.8125 13.28125 L 10.8125 12.3125 C 10.910156 12.261719 11 12.226563 11.125 12.15625 C 11.546875 11.921875 12.09375 11.554688 12.65625 11.0625 C 13.636719 10.207031 14.527344 8.792969 14.78125 7 Z"></path>
                </svg>
              </a>
            </div>
            <button
              id="new-quote"
              // style={newColor}
              style={isHovered ? { ...newColor, ...newColorHover } : newColor}
              onClick={() => {
                fetchQuote();
                handleButtonClick();
              }}
              // onMouseEnter={handleMouseEnter}
              // onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              New quote
            </button>
            {/* <button id="tweet-quote"></button>/ */}
          </div>
        </div>

        <div className="contact">
          {" "}
          by{" "}
          <a
            id="profile"
            href="https://www.linkedin.com/in/kehinde-adigun-/"
            target="_blank"
            rel="noreferrer"
          >
            @Kehad
          </a>
        </div>
      </Layout>
    </>
  );
};
export default BodyMessage;

// const PseudoClassExample = ({ children }) => {
//   const styles = {
//     base: {
//       padding: '10px',
//       backgroundColor: 'blue',
//       color: 'white',
//       border: 'none',
//       cursor: 'pointer',
//     },
//     hover: {
//       backgroundColor: 'green',
//     },
//   };

//   return (
//     <button
//       style={{
//         ...styles.base,
//         ...styles.hover /* You can conditionally apply hover styles here */,
//       }}
//     >
//       {children}
//     </button>
//   );
// };

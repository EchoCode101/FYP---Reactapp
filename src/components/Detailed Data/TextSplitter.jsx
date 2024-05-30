import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const splitIntoParagraphs = (text) => {
  const sentences = text.split(". ");
  let paragraphs = "";
  let paragraph = "";

  sentences.forEach((sentence) => {
    paragraph += sentence + ". ";
    if (paragraph.length > 200) {
      paragraphs += paragraph.trim() + "\n\n";
      paragraph = "";
    }
  });

  if (paragraph.trim().length > 0) {
    paragraphs += paragraph.trim();
  }

  return paragraphs
    .split("\n\n")
    .map((para, index) => <p key={index}>{para}</p>);
};

const TextSplitter = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (containerRef.current) {
      if (isExpanded) {
        containerRef.current.classList.remove("collapsed");
        containerRef.current.classList.add("expanded");
      } else {
        containerRef.current.classList.remove("expanded");
        containerRef.current.classList.add("collapsed");
      }
    }
  }, [isExpanded]);

  const renderedText = splitIntoParagraphs(text);
  const previewText = renderedText.slice(0, 2);

  return (
    <>
      {text && (
        <div>
          <div
            ref={containerRef}
            className={`transition-container ${
              isExpanded ? "expanded" : "collapsed"
            }`}
          >
            {isExpanded ? renderedText : previewText}
          </div>
          <button
            style={{
              marginBottom: "50px",
            }}
            className="btn btn-primary"
            onClick={toggleExpand}
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </>
  );
};

TextSplitter.propTypes = {
  text: PropTypes.string,
};

export default TextSplitter;

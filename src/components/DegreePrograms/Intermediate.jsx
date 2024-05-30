import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SmoothScroll from "smooth-scroll";

const IntermediateDegreeComponent = () => {
  const [intermediate, setIntermediate] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState(null);
  useEffect(() => {
    // Initialize SmoothScroll
    // eslint-disable-next-line no-unused-vars
    const scroll = new SmoothScroll('a[href*="#"]', {
      speed: 800,
      easing: "easeInOutCubic",
    });

    // Show/Hide Scroll to Top button based on scroll position
    const scrollFunction = () => {
      const btn = document.getElementById("myBtn");
      if (btn) {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          btn.style.display = "block";
        } else {
          btn.style.display = "none";
        }
      }
    };

    window.addEventListener("scroll", scrollFunction);

    return () => {
      // Cleanup event listener
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  // Scroll to Top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/uni/intermediate")
      .then((response) => setIntermediate(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDegreeSelection = (degree) => {
    if (selectedDegree === degree) {
      // If the same degree is clicked again, close the dropdown
      setSelectedDegree(null);
    } else {
      setSelectedDegree(degree);
    }
  };

  return (
    <div className=" mt-5">
      <br />
      <h1>Intermediate Degree Programs and Higher Education</h1>
      <div className="mt-4">
        <div className="dropdown">
          {intermediate.map((degree, index) => (
            <div key={index} className="dropdown-item">
              <div
                title="Click to expand/contract the dropdown menu"
                onClick={() => handleDegreeSelection(degree.title)}
                className="degree-title"
              >
                {degree.title}
                {/* Conditional rendering for arrow icon */}
                {selectedDegree === degree.title ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </div>
              {/* Conditional rendering for dropdown content */}
              {selectedDegree === degree.title && (
                <div className="dropdown-content">
                  {degree.higher_education_degree.map((higherDegree, idx) => (
                    <div key={idx} className="dropdown-content-text">
                      {idx + 1}. {higherDegree}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollToTop}
        id="myBtn"
        title="Go to top"
        style={{ display: "none" }}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default IntermediateDegreeComponent;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UniversityDetails from "./UniversityDetails";
import SmoothScroll from "smooth-scroll";
import PropTypes from "prop-types";
import PageNotFound from "../PageNotFound";

const ArticleLoader = ({ setProgress }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setProgress(20);
      try {
        const response = await fetch(
          `http://localhost:8080/api/uni/AllUniversities/simpleData/${id}`
        );
        setProgress(50);
        if (response.status !== 200) {
          setError(true);
          setProgress(100);
          return;
        }
        const jsonData = await response.json();
        setProgress(70);
        setData(jsonData);
        setProgress(100);
      } catch (error) {
        setError(true);
        setProgress(65);
        console.log(error);
      }
    };

    fetchData();
  }, [id, setProgress]);

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

  if (error) {
    return <PageNotFound />;
  }

  return (
    <div className="container">
      {data && (
        <>
          <UniversityDetails
            document1Data={data.document1Data}
            document2Data={data.document2Data}
          />
          <button
            onClick={scrollToTop}
            id="myBtn"
            title="Go to top"
            style={{ display: "none" }}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </>
      )}
    </div>
  );
};

// Add prop type validation
ArticleLoader.propTypes = {
  setProgress: PropTypes.func.isRequired,
};

export default ArticleLoader;

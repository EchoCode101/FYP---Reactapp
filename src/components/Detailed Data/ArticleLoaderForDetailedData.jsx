import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UniversityDetails from "./UniversityDetails";
import ScrollTopBtn from "../SmoothScroll";

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
          `http://localhost:8080/api/uni/AllUniversities/detailedDataAll/${id}`
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
          <ScrollTopBtn />;
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

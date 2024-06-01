import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ScrollTopBtn from "../SmoothScroll";

import { Alert } from "react-bootstrap";
const DegreeComponent = () => {
  const [degrees, setDegrees] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDegrees, setFilteredDegrees] = useState([]);
  // const [showWarning, setShowWarning] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/uni/degrees")
      .then((response) => {
        setDegrees(response.data);
        setFilteredDegrees(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchInputChange = (event) => {
    const input = event.target.value.toLowerCase();
    setSearchInput(input);
  };

  const handleDegreeSelection = (degree) => {
    if (selectedDegree === degree) {
      // If the same degree is clicked again, close the dropdown
      setSelectedDegree(null);
    } else {
      setSelectedDegree(degree);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  if (searchInput.length < 2 || searchInput.length > 50) {
    //    setShowWarning(true);
    //    return;
    //  }
    const filtered = degrees.filter((degree) =>
      degree.title.toLowerCase().includes(searchInput)
    );
    setFilteredDegrees(filtered);
  };
  const handleClear = () => {
    setSearchInput("");
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4">Degree Programs for Masters</h1>
        <div className="mb-3">
          <center>
            <form onSubmit={handleSubmit} className="d-flex input_programs">
              <div className="input-group me-3">
                <input
                  title="Filter bachlor degrees and expand the dropdown menu for more information."
                  type="text"
                  className="form-control"
                  placeholder="Filter bachlor degrees and click dropdown menu for more information."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  minLength={2}
                  maxLength={50}
                />
                {searchInput.length > 0 && (
                  <span
                    className="input-group-text btn btn-danger "
                    onClick={handleClear}
                  >
                    Clear
                  </span>
                )}
              </div>
              <button className="btn btn-primary ps-3 pe-3">Search</button>
            </form>
          </center>
        </div>
        {/* Dropdown menu for filtered degrees */}
        {filteredDegrees.length === 0 && (
          <Alert dismissible variant="info">
            No results found.
          </Alert>
        )}
        {handleSubmit && (
          <div className="dropdown">
            {filteredDegrees.map((degree, index) => (
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
        )}
      </div>
      <ScrollTopBtn />;
    </>
  );
};

export default DegreeComponent;

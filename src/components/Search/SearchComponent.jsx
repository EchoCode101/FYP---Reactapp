import { useState, useEffect } from "react";
import { Card, Row, Col, Form, Button, Alert } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import ScrollTopBtn from "../SmoothScroll";

function SearchComponent({ setProgress }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortOption, setSortOption] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showWarning, setShowWarning] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [locationData, setLocationData] = useState([]);
  const [nameData, setNameData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [rankFilter, setRankFilter] = useState("");

  const handleSearch = () => {
    if (!searchQuery && !locationFilter && !regionFilter && !rankFilter) {
      setProgress(10);
      setShowWarning(true);
      setProgress(100);
      return;
    }
    setLoading(true);
    setProgress(10);
    setTimeout(async () => {
      setProgress(20);
      try {
        setProgress(30);
        setShowWarning(false);
        setLoading(true);
        setProgress(40);
        const response = await fetch(
          `http://localhost:8080/api/uni/AllUniversities/simpleData/search?query=${encodeURIComponent(
            searchQuery
          )}&location=${encodeURIComponent(
            locationFilter
          )}&region=${encodeURIComponent(
            regionFilter
          )}&rank=${encodeURIComponent(
            rankFilter
          )}&sort=${sortOption}&direction=${sortDirection}&page=1`
        );
        setProgress(50);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setProgress(70);
        const data = await response.json();
        setProgress(80);
        setSearchResults(data.data);
        setProgress(80);
        setHasMore(page < data.totalPages);
        setTotalResults(data.data.length);
        setPage(1);
        setProgress(100);
        setNoResultsFound(data.data.length === 0);
      } catch (error) {
        setProgress(10);
        console.error("Error fetching data:", error);
        setProgress(100);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setLocationData((prevLocationData) => [
      ...prevLocationData,
      ...searchResults.map((element) => element.location),
    ]);
    setNameData((prevNameData) => [
      ...prevNameData,
      ...searchResults.map((element) => element.name),
    ]);
  }, [searchResults]);

  const fetchMoreData = () => {
    setProgress(0);
    const nextPage = page + 1;
    setProgress(10);

    setTimeout(async () => {
      try {
        setProgress(30);
        setShowWarning(false);
        const response = await fetch(
          `http://localhost:8080/api/uni/AllUniversities/simpleData/search?query=${encodeURIComponent(
            searchQuery
          )}&location=${encodeURIComponent(
            locationFilter
          )}&region=${encodeURIComponent(
            regionFilter
          )}&rank=${encodeURIComponent(
            rankFilter
          )}&sort=${sortOption}&direction=${sortDirection}&page=${nextPage}`
        );
        setProgress(50);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setProgress(60);
        const data = await response.json();
        setProgress(70);
        if (data.data.length > 0) {
          setSearchResults((prevResults) => [...prevResults, ...data.data]);
          setProgress(80);
          setPage(nextPage);
          setProgress(90);
          setHasMore(page < data.totalPages);
          setTotalResults(totalResults + data.data.length);
          setProgress(100);
        } else {
          setProgress(10);
          setHasMore(false); // No more data to fetch
          setProgress(100);
        }
      } catch (error) {
        setProgress(10);
        console.error("Error fetching data:", error);
        setProgress(100);
      }
    }, 300);
  };
  const handleInputChange = (e) => {
    let filteredValue = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only alphabets and space
    if (filteredValue.length > 50) filteredValue = filteredValue.slice(0, 50); // Limit to 50 characters
    setSearchQuery(filteredValue);
    nameData.filter((element) => element.toLowerCase().includes(searchQuery));
  };
  const handleLocationChange = (e) => {
    let filteredValue = e.target.value.replace(/[^a-zA-Z,\s]/g, ""); // Allow only alphabets, comma, and space
    if (filteredValue.length > 100) filteredValue = filteredValue.slice(0, 100); // Limit to 100 characters
    setLocationFilter(filteredValue);
    locationData.filter((element) =>
      element.toLowerCase().includes(locationFilter)
    );
  };

  const handleRegionChange = (e) => {
    setRegionFilter(e.target.value);
  };

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSortDirectionChange = (e) => {
    setSortDirection(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  // Function to sort the data based on the selected option and direction

  const sortedResults = [...searchResults].sort((a, b) => {
    if (sortDirection === "asc") {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "location") {
        return a.location.localeCompare(b.location);
      } else if (sortOption === "rank") {
        return a.rank - b.rank;
      }
    } else {
      if (sortOption === "name") {
        return b.name.localeCompare(a.name);
      } else if (sortOption === "location") {
        return b.location.localeCompare(a.location);
      } else if (sortOption === "rank") {
        return b.rank - a.rank;
      }
    }
    return 0;
  });
  const handleClearSearchInput = () => {
    setSearchQuery("");
  };
  const handleClearLocationInput = () => {
    setLocationFilter("");
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3 ms-auto me-auto">
          <div className="search_fileds">
            <Col className="input-group  my-3">
              <Form.Control
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search by name"
                maxLength={50}
              />
              {searchQuery.length > 0 && (
                <span
                  className="input-group-text btn btn-danger "
                  onClick={handleClearSearchInput}
                >
                  Clear
                </span>
              )}
            </Col>
            <Col>
              <Form.Select value={regionFilter} onChange={handleRegionChange}>
                <option value="">Select Region</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="Latin America">Latin America</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
              </Form.Select>
            </Col>
          </div>
          <div className="search_fileds">
            <Col className="my-3">
              <Form.Select value={sortOption} onChange={handleSortOptionChange}>
                <option value="name">Sort by Name</option>
                <option value="location">Sort by Location</option>
                <option value="rank">Sort by Rank</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                value={sortDirection}
                onChange={handleSortDirectionChange}
              >
                <option value="asc">
                  Ascending &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&uarr;
                  <i className="fa-solid fa-sort-up"></i>
                </option>
                <option value="desc">
                  Descending &nbsp;&nbsp; &nbsp;&darr;
                  <i className="fa-solid fa-sort-down"></i>
                </option>
              </Form.Select>
            </Col>
          </div>
          <div className="search_fileds">
            <Col className="input-group  my-3">
              <Form.Control
                type="text"
                value={locationFilter}
                onChange={handleLocationChange}
                placeholder="Filter by location"
                maxLength={100} // Limiting to 100 characters
              />
              {locationFilter.length > 0 && (
                <span
                  className="input-group-text btn btn-danger "
                  onClick={handleClearLocationInput}
                >
                  Clear
                </span>
              )}
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                className="pe-5 ps-5"
                onClick={handleSearch}
                type="submit"
              >
                Search
              </Button>
              <span
                style={{
                  fontWeight: "600",
                  border: "2px solid #0000007d",
                  borderRadius: "8px",
                  padding: "5px",
                  backgroundColor: " #022c6e",
                  color: "white",
                }}
              >
                {"Results Found : " + totalResults}
              </span>
            </Col>
          </div>
        </Row>
      </Form>
      {handleSubmit && loading && <Spinner />}

      {sortedResults.length > 0 && (
        <InfiniteScroll
          style={{
            overflow: "hidden",
          }}
          dataLength={sortedResults.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Spinner />}
          scrollThreshold={0.9}
        >
          <Row xs={1} md={2} lg={3} className="g-4">
            {sortedResults.map((element, index) => (
              <Col key={index} xl={3}>
                <Card className="card_search">
                  <Card.Img
                    variant="top"
                    alt={element.image_name}
                    src={`../../logo_imgs/${element.image_name}.jpg`}
                  />

                  <Card.Body>
                    <Card.Title>{element.name}</Card.Title>
                    <Card.Text>Location: {element.location}</Card.Text>
                    <Card.Text>Region: {element.region}</Card.Text>
                    <Card.Text>Rank: {element.rank}</Card.Text>
                    <Button
                      variant="primary"
                      href={`/all_universities/${element._id}`}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <br />
          <br />
          <ScrollTopBtn />;
        </InfiniteScroll>
      )}
      {showWarning && (
        <center>
          <Alert
            variant="warning"
            onClose={() => setShowWarning(false)}
            dismissible
          >
            Please enter a search query or select a country.
          </Alert>
        </center>
      )}
      {noResultsFound && (
        <Alert onClose={() => setShowWarning(false)} dismissible variant="info">
          No results found.
        </Alert>
      )}
    </>
  );
}
SearchComponent.propTypes = {
  setProgress: PropTypes.func,
};
export default SearchComponent;

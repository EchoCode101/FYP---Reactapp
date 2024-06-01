import { Form, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import CurrencyConverter from "../CurrencyConverter";
import SearchComponent from "./SearchComponent";
import { useState } from "react";
function Search({ setProgress }) {
  const [searchType, setSearchType] = useState("other"); // Default to "other"
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  return (
    <Container className="mt-5">
      <h1>Parametric Search</h1>

      {/* Dropdown for selecting search type */}
      <div className="ms-auto me-auto" style={{ maxWidth: "600px" }}>
        <Form.Select value={searchType} onChange={handleSearchTypeChange}>
          <option value="fee">Search by Fee</option>
          <option value="other">Search by Other Parameters</option>
        </Form.Select>
      </div>

      {/* Conditionally render based on selected search type */}
      {searchType === "fee" ? (
        <CurrencyConverter />
      ) : (
        <SearchComponent setProgress={setProgress} />
      )}
    </Container>
  );
}
Search.propTypes = {
  setProgress: PropTypes.func.isRequired,
};
export default Search;

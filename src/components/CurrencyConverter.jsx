import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Button, Form, Alert } from "react-bootstrap";
const UniversityFilter = () => {
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [maxFee, setMaxFee] = useState(100); // Initial max fee
  const [currencyRates, setCurrencyRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order: "asc" or "desc"
  const [totalResults, setTotalResults] = useState(0);

  // Fetch university data
  const fetchUniversityData = async () => {
    await axios
      .get("http://localhost:8080/api/uni/AllUniversities/detailedDataAll")
      .then((response) => {
        setUniversities(response.data);
      })
      .catch((error) =>
        console.error("Error fetching university data:", error)
      );
  };

  // Fetch currency rates
  const fetchCurrencyRates = async () => {
    await axios
      .get("https://api.exchangerate-api.com/v4/latest/USD") // Replace with a free currency API
      .then((response) => {
        setCurrencyRates(response.data.rates);
      })
      .catch((error) => console.error("Error fetching currency rates:", error));
  };

  // Filter universities based on max fee
  const filterUniversities = () => {
    if (universities.length > 0) {
      const filtered = universities.filter((university) => {
        const InternationalFee = university.tuition_fee_international;
        if (InternationalFee && InternationalFee.length !== 0) {
          // Check if InternationalFee is not undefined or empty
          const feeString = InternationalFee[2];
          const { fee, currency } = extractFeeAndCurrency(feeString);
          if (fee === 0 || feeString === "-") {
            return false;
          }
          const convertedFee = convertFee(
            fee,
            currency,
            selectedCurrency,
            currencyRates
          );
          // console.log(
          //   `University: ${university.about_heading}, Fee: ${fee}, Currency: ${currency}, Converted Fee: ${convertedFee}`
          // );
          return parseFloat(convertedFee) <= maxFee;
        }
        return false; // If InternationalFee is undefined or empty, return false
      });
      setTotalResults(filtered.length);
      // Sort filtered universities based on converted fee and sorting order
      const sorted = filtered.sort((a, b) => {
        const feeA = convertFee(
          parseFloat(extractFeeAndCurrency(a.tuition_fee_international[2]).fee),
          extractFeeAndCurrency(a.tuition_fee_international[2]).currency,
          selectedCurrency,
          currencyRates
        );
        const feeB = convertFee(
          parseFloat(extractFeeAndCurrency(b.tuition_fee_international[2]).fee),
          extractFeeAndCurrency(b.tuition_fee_international[2]).currency,
          selectedCurrency,
          currencyRates
        );
        return sortOrder === "asc" ? feeA - feeB : feeB - feeA;
      });
      setFilteredUniversities(sorted);
    }
  };
  const handleSortDirectionChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Extract fee and currency from fee string
  const extractFeeAndCurrency = (feeString) => {
    const match = feeString.match(/([\d,]+)\s*(\w+)/);
    if (match) {
      const fee = parseFloat(
        match[1].replace(/[^0-9.-]+/g, "").replace(",", "")
      );
      const currency = match[2];
      return { fee, currency };
    }
    return { fee: 0, currency: "" };
  };

  // Convert fee to selected currency
  const convertFee = (fee, baseCurrency, targetCurrency, rates) => {
    const baseRate = rates[baseCurrency];
    const targetRate = rates[targetCurrency];
    if (baseRate && targetRate) {
      const feeInUSD = fee / baseRate;
      return feeInUSD * targetRate;
    }
    return fee; // Default to original fee if rates are unavailable
  };

  // Format number with commas
  const formatWithCommas = (number, currency) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: currency,
    });
  };

  // Initial fetch of university data and currency rates
  useEffect(() => {
    fetchUniversityData();
    fetchCurrencyRates();
  }, []);

  // Refetch data when sortOrder, maxFee, selectedCurrency, universities, or currencyRates change
  useEffect(() => {
    filterUniversities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);
  // setTotalResults(filterUniversities.length);

  return (
    <div className="mt-5 mb-5">
      <>
        <label
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <span
            style={{
              border: "1px solid black",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "#d4f5ff",
            }}
          >
            Max Tuition Fee <b> ({selectedCurrency})</b>:
          </span>
          &nbsp;&nbsp;&nbsp;
          <input
            style={{ width: "calc(100% - 500px)" }}
            type="range"
            min="100"
            max="20000000"
            step="100"
            value={maxFee}
            onChange={(e) => setMaxFee(parseInt(e.target.value))}
          />
          <b>
            {" "}
            &nbsp;&nbsp;&nbsp;{" "}
            <span
              className="mt-5"
              style={{
                border: "1px solid black",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#ffe69c",
              }}
            >
              {formatWithCommas(maxFee, selectedCurrency)}
            </span>
          </b>
        </label>
        <br />
        <Row className="mb-3 ms-auto me-auto">
          <div className="sort_fields">
            <Col>
              <Form.Label>
                Select Currency: &nbsp;&nbsp;&nbsp;
                <Form.Select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                  {Object.keys(currencyRates).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </Form.Select>
              </Form.Label>
              <button
                className="btn btn-primary ms-5"
                onClick={filterUniversities}
              >
                Apply Filter
              </button>
              <span
                className="ms-5"
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
            <Col>
              {filterUniversities && filteredUniversities.length !== 0 && (
                <>
                  <Form.Select
                    value={sortOrder}
                    onChange={handleSortDirectionChange}
                    className="mt-4"
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
                </>
              )}
            </Col>
          </div>
        </Row>
        <div className="mt-4">
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredUniversities.length > 0 &&
              filteredUniversities.map((element, index) => (
                <Col key={index} xl={3}>
                  <Card className="card_search">
                    <Card.Img
                      variant="top"
                      alt={element.image_name}
                      src={`../../logo_imgs/${element.image_name}.jpg`}
                    />

                    <Card.Body>
                      <Card.Title>{element.image_name}</Card.Title>
                      <Card.Text>
                        Location: <b> {element.location}</b>
                      </Card.Text>
                      <Card.Text>
                        Region: <b>{element.region}</b>
                      </Card.Text>
                      <Card.Text>
                        Rank: <b>{element.rank}</b>
                      </Card.Text>
                      <Card.Text>
                        International Fee:{" "}
                        <b> {element.tuition_fee_international[2]} </b>
                      </Card.Text>
                      <Card.Text>
                        <ins>
                          <b>
                            Converted Fee:{" "}
                            {formatWithCommas(
                              convertFee(
                                parseFloat(
                                  extractFeeAndCurrency(
                                    element.tuition_fee_international[2]
                                  ).fee
                                ),
                                extractFeeAndCurrency(
                                  element.tuition_fee_international[2]
                                ).currency,
                                selectedCurrency,
                                currencyRates
                              ),
                              selectedCurrency
                            )}
                          </b>
                        </ins>
                      </Card.Text>
                      <Button
                        variant="primary"
                        href={`/detailedData/${element._id}`}
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
        {filterUniversities && filteredUniversities.length === 0 && (
          <Alert dismissible variant="info">
            No results found.
          </Alert>
        )}
      </>
    </div>
  );
};

export default UniversityFilter;

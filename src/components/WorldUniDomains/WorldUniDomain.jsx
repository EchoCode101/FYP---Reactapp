import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import ScrollTopBtn from "../SmoothScroll";

const WorldUniDomain = ({ setProgress }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = () => {
    if (!searchQuery && !countryFilter) {
      setProgress(20);
      setShowWarning(true);
      setProgress(100);
      return;
    }
    setProgress(10);
    setLoading(true);
    setProgress(20);
    setTimeout(async () => {
      try {
        setShowWarning(false);
        setProgress(30);
        setLoading(true);
        setProgress(40);
        const response = await axios.get(
          `http://localhost:8080/api/uni/WorldsUnies_and_Domains?page=1&limit=20&query=${searchQuery}&country=${countryFilter}`
        );
        setProgress(50);
        setSearchResults(response.data.data); // Set search results to the new data
        setProgress(60);
        setTotalResults(response.data.data.length);
        setHasMore(response.data.next !== undefined);
        setProgress(70);
        setPage(1); // Reset page after each search
        setProgress(100);
        setNoResultsFound(response.data.data.length === 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const fetchMoreData = () => {
    setProgress(0);
    const nextPage = page + 1;
    const url = `http://localhost:8080/api/uni/WorldsUnies_and_Domains?page=${nextPage}&limit=20&query=${searchQuery}&country=${countryFilter}`;

    setProgress(20);
    setTimeout(async () => {
      try {
        const response = await axios.get(url);
        setProgress(30);
        const newData = response.data.data;
        setTotalResults(totalResults + newData.length);
        console.log(totalResults);

        setProgress(50);

        if (newData.length > 0) {
          setProgress(70);
          setSearchResults((prevResults) => [...prevResults, ...newData]);
          setProgress(80);
          setPage(nextPage);
          setProgress(100);
        } else {
          setProgress(10);
          setHasMore(false); // No more data to fetch
          setProgress(100);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 700);
  };

  useEffect(() => {
    // Initial search when component mounts
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const handleClearSearchInput = () => {
    setSearchQuery("");
  };
  return (
    <Container className="mt-5 text-center">
      <h1 className="mb-4">World Universities & Their Domains</h1>
      <div className="ms-auto me-auto">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 row_allUniDomains">
            <Col className="input-group ">
              <Form.Control
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search by name"
                maxLength={50}
                minLength={3}
              />
              {searchQuery.length > 0 && (
                <span
                  span
                  className="input-group-text btn btn-danger "
                  onClick={handleClearSearchInput}
                >
                  Clear
                </span>
              )}
            </Col>
            <Col>
              <Form.Select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
              >
                <option value="">Select Country</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">
                  Bosnia and Herzegovina
                </option>
                <option value="Botswana">Botswana</option>
                <option value="Brazil">Brazil</option>

                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">
                  Central African Republic
                </option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Colombia">Colombia</option>
                <option value="Congo">Congo</option>
                <option value="Congo, the Democratic Republic of the">
                  Congo, the Democratic Republic of the
                </option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote d'Ivoire">Côte d&apos;Ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>

                <option value="Holy See (Vatican City State)">
                  Holy See (Vatican City State)
                </option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Korea, Democratic People's Republic of">
                  Korea, Democratic People&apos;s Republic of
                </option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Kosovo">Kosovo</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">
                  Lao People&apos;s Democratic Republic
                </option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mexico">Mexico</option>

                <option value="Moldova, Republic of">
                  Moldova, Republic of
                </option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="North Macedonia">North Macedonia</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palestine, State of">Palestine, State of</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Réunion</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Kitts and Nevis">
                  Saint Kitts and Nevis
                </option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Vincent and the Grenadines">
                  Saint Vincent and the Grenadines
                </option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>

                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Sudan">South Sudan</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syrian Arab Republic">
                  Syrian Arab Republic
                </option>
                <option value="Taiwan, Province of China">
                  Taiwan, Province of China
                </option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania, United Republic of">
                  Tanzania, United Republic of
                </option>
                <option value="Thailand">Thailand</option>
                <option value="Togo">Togo</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos Islands">
                  Turks and Caicos Islands
                </option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">
                  United Arab Emirates
                </option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Virgin Islands, British">
                  Virgin Islands, British
                </option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </Form.Select>
            </Col>
            <Col
              className="text-start"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Button variant="primary pe-5 ps-5" type="submit">
                Search
              </Button>
              <span
                className="ms-2 results"
                style={{
                  fontWeight: "600",
                  backgroundColor: " rgb(8 25 171)",
                  color: "white",
                }}
              >
                {"Results Found : " + totalResults}
              </span>
            </Col>
          </Row>
        </Form>
      </div>
      {handleSubmit && loading && <Spinner />}

      {showWarning && (
        <Alert
          variant="warning"
          onClose={() => setShowWarning(false)}
          dismissible
        >
          Please enter a search query or select a country.
        </Alert>
      )}
      {searchResults.length > 0 && (
        <InfiniteScroll
          style={{
            overflow: "hidden",
          }}
          dataLength={searchResults.length}
          next={fetchMoreData} // Fetch more data when scrolling
          hasMore={hasMore}
          loader={<Spinner />}
          scrollThreshold={0.9} // Adjust scrollThreshold if necessary
        >
          <Row xs={1} md={2} lg={3} className="g-4">
            {searchResults.map((uni) => (
              <Col key={uni._id}>
                <Card className="card_allDomains">
                  <Card.Body>
                    <Card.Title>{uni.name}</Card.Title>
                    <Card.Text>
                      <b>Country: </b> {uni.country}
                    </Card.Text>
                    <Card.Text>
                      <b>Web Pages: </b>
                      {uni.web_pages.map((web_page) => (
                        <Link key={web_page} to={web_page} target="_blank">
                          <span>{web_page}</span>
                        </Link>
                      ))}
                    </Card.Text>
                    <Card.Text>
                      <b>Alpha to Code: </b>
                      {uni.alpha_two_code}
                    </Card.Text>
                    {uni.state_province && (
                      <Card.Text>
                        <b>State / Province: </b>
                        {uni.state_province}
                      </Card.Text>
                    )}
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
      {!handleSubmit && loading && <Spinner />}
      {noResultsFound && (
        <Alert onClose={() => setShowWarning(false)} dismissible variant="info">
          No results found.
        </Alert>
      )}
    </Container>
  );
};

WorldUniDomain.propTypes = {
  setProgress: PropTypes.func,
};

export default WorldUniDomain;

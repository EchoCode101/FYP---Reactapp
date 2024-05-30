import PropTypes from "prop-types";

const UniversityInfoTable = ({
  Rankings_n_ratings_heading,
  Rankings_n_ratings_details,
  Rankings_n_ratings_ranks,
}) => {
  return (
    <div className="univ-subsection-full-width">
      {Rankings_n_ratings_heading && <h3>{Rankings_n_ratings_heading}</h3>}
      {Rankings_n_ratings_details.length !== 0 && (
        <p>{Rankings_n_ratings_details}</p>
      )}
      {Rankings_n_ratings_ranks.length !== 0 && (
        <div className="univ-subsection-full-width-div row">
          {renderData(Rankings_n_ratings_ranks)}
        </div>
      )}
    </div>
  );
};

const renderData = (data) => {
  const items = [];
  for (let i = 1; i < data.length; i += 2) {
    items.push(
      <div
        key={i}
        className="col-md-6 mb-3"
        style={{
          border: "2px solid #777777cf",
          display: "flex",
          flexDirection: "column",
          minWidth: "140px",
          maxWidth: "fit-content",
          maxHeight: "100px",
          minHeight: "fit-content",
          margin: "5px",
          backgroundColor: "#fdfdfd",
          textAlign: "start",
          padding: "8px",
          borderRadius: "8px",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        <div>
          <b>
            <label>{data[i - 1]}</label>
          </b>{" "}
          :<span> {data[i]}</span>
        </div>
      </div>
    );
  }
  return items;
};

UniversityInfoTable.propTypes = {
  Rankings_n_ratings_heading: PropTypes.array,
  Rankings_n_ratings_details: PropTypes.array,
  Rankings_n_ratings_ranks: PropTypes.array,
};

export default UniversityInfoTable;

import PropTypes from "prop-types";

const CampusLocations = ({
  campus_locations_all_locations,
  campus_locations_heading,
}) => {
  return (
    <>
      {campus_locations_heading && (
        <>
          <h3>{campus_locations_heading}</h3>
          <div
            className="univ-subsection-full-width"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <div
              style={{
                marginRight: "50px",
              }}
            >
              {campus_locations_all_locations.length !== 0 && (
                <>
                  <div className="univ-subsection-full-width-div row">
                    <ul style={{ listStyle: "none" }}>
                      {renderData(campus_locations_all_locations)}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const renderData = (data) => {
  const items = [];
  for (let i = 0; i < data.length; i += 1) {
    items.push(
      <li
        key={i}
        style={{
          borderBottom: "1px solid rgb(5 20 35)",
          marginBottom: "10px",
          maxWidth: "fit-content",
        }}
      >
        <b>{i + 1} - </b>
        {data[i]}
      </li>
    );
  }
  return items;
};

CampusLocations.propTypes = {
  campus_locations_heading: PropTypes.array,
  campus_locations_all_locations: PropTypes.array,
};

export default CampusLocations;

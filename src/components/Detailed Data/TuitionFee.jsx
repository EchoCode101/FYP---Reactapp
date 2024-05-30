import PropTypes from "prop-types";

const TuitionFee = ({ tuition_fee_domestic, tuition_fee_international }) => {
  return (
    <>
      {tuition_fee_domestic.length !== 0 &&
        tuition_fee_international.length !== 0 && (
          <>
            <h3>Tuition fee and scholarships</h3>
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
                {tuition_fee_domestic.length !== 0 && (
                  <>
                    <h5 className="univ-subsection-full-width-title">
                      Domestic Students
                    </h5>
                    <div className="univ-subsection-full-width-div row">
                      {renderData(tuition_fee_domestic)}
                    </div>
                  </>
                )}
              </div>
              <div
                style={{
                  minWidth: "400px",
                }}
              >
                {tuition_fee_international.length !== 0 && (
                  <>
                    <h5 className="univ-subsection-full-width-title">
                      International Students
                    </h5>
                    <div className="univ-subsection-full-width-div row">
                      {renderData(tuition_fee_international)}
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
  for (let i = 2; i < data.length; i += 2) {
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
        }}
      >
        <div>
          <label>{data[i - 1]}</label> :
          <span>
            <b> {data[i]}</b>
          </span>
        </div>
      </div>
    );
  }
  return items;
};

TuitionFee.propTypes = {
  tuition_fee_domestic: PropTypes.array,
  tuition_fee_international: PropTypes.array,
};

export default TuitionFee;

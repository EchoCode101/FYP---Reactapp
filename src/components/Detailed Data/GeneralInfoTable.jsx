import PropTypes from "prop-types";

const GeneralInfoTable = ({ general_info }) => {
  return (
    <div className="univ-subsection-full-width">
      {general_info && general_info.length !== 0 && (
        <>
          <h3 className="univ-subsection-full-width-title">General Info</h3>
          <div className="univ-subsection-full-width-div row">
            {renderData(general_info)}
          </div>
        </>
      )}
    </div>
  );
};

const renderData = (data) => {
  const items = [];
  for (let i = 0; i < data.length; i += 1) {
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
          <i style={{ fontStyle: "normal", fontWeight: "600" }}>
            <label>{data[i]}</label>
          </i>
        </div>
      </div>
    );
  }
  return items;
};

GeneralInfoTable.propTypes = {
  general_info: PropTypes.array,
};

export default GeneralInfoTable;

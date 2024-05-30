import PropTypes from "prop-types";

const UniversityInfoTable = ({
  uni_info_heading,
  uni_info_admission_general,
  uni_info_admission_bachelor,
  uni_info_admission_master,
}) => {
  const hasAdmissionInfo =
    uni_info_admission_general.length > 0 ||
    uni_info_admission_bachelor.length > 0 ||
    uni_info_admission_master.length > 0;

  return (
    <div className="univ-subsection-full-width">
      {hasAdmissionInfo && <h3>{uni_info_heading}</h3>}

      {uni_info_admission_general.length > 0 && (
        <>
          <h5 className="univ-subsection-full-width-title">General</h5>
          <div className="univ-subsection-full-width-div row">
            {renderData(uni_info_admission_general)}
          </div>
        </>
      )}

      {uni_info_admission_bachelor.length > 0 && (
        <>
          <h5 className="univ-subsection-full-width-title">Bachelor</h5>
          <div className="univ-subsection-full-width-div row">
            {renderData(uni_info_admission_bachelor)}
          </div>
        </>
      )}

      {uni_info_admission_master.length > 0 && (
        <>
          <h5 className="univ-subsection-full-width-title">Master</h5>
          <div className="univ-subsection-full-width-div row">
            {renderData(uni_info_admission_master)}
          </div>
        </>
      )}
    </div>
  );
};

const renderData = (data) => {
  return data.slice(1).map(
    (item, index) =>
      index % 2 === 0 && (
        <div
          key={index}
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
            <label>{item}</label> :
            <span>
              <b> {data[index+2]}</b>
            </span>
          </div>
        </div>
      )
  );
};

UniversityInfoTable.propTypes = {
  uni_info_heading: PropTypes.string,
  uni_info_admission_general: PropTypes.array,
  uni_info_admission_bachelor: PropTypes.array,
  uni_info_admission_master: PropTypes.array,
};

export default UniversityInfoTable;

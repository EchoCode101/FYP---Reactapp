import PropTypes from "prop-types";
import TextSplitter from "./TextSplitter";

const AvailablePrograms = ({
  available_programs_heading,
  available_programs_master_details,
  available_programs_bachelor,
  available_programs_master,
  available_programs_MBA,
  available_programs_phd,
}) => {
  return (
    <div className="univ-subsection-full-width">
      <h3>{available_programs_heading}</h3>
      {available_programs_master_details && (
        <>
          <h6>Masters Details</h6>
          <TextSplitter text={available_programs_master_details} />
        </>
      )}
      <div>
        <div className="row">
          <div className="col-lg-6">
            {available_programs_bachelor.length !== 0 && (
              <>
                <h4 className="univ-subsection-full-width-title">Bachelor</h4>
                <div className="univ-subsection-full-width-div row">
                  <ul style={{ listStyle: "none" }}>
                    {renderData(available_programs_bachelor)}
                  </ul>
                </div>
              </>
            )}
          </div>
          <div className="col-lg-6">
            {available_programs_master.length !== 0 && (
              <>
                <h4 className="univ-subsection-full-width-title">Master</h4>
                <div className="univ-subsection-full-width-div row">
                  <ul style={{ listStyle: "none" }}>
                    {renderData(available_programs_master)}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            {available_programs_MBA.length !== 0 && (
              <>
                <h4 className="univ-subsection-full-width-title">MBA</h4>
                <div className="univ-subsection-full-width-div row">
                  <ul style={{ listStyle: "none" }}>
                    {renderData(available_programs_MBA)}
                  </ul>
                </div>
              </>
            )}
          </div>
          <div className="col-lg-6">
            {available_programs_phd.length !== 0 && (
              <>
                <h4 className="univ-subsection-full-width-title">PHD</h4>
                <div className="univ-subsection-full-width-div row">
                  <ul style={{ listStyle: "none" }}>
                    {renderData(available_programs_phd)}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
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

AvailablePrograms.propTypes = {
  available_programs_heading: PropTypes.string,
  available_programs_bachelor: PropTypes.array,
  available_programs_master_details: PropTypes.string,
  available_programs_master: PropTypes.array,
  available_programs_MBA: PropTypes.array,
  available_programs_phd: PropTypes.array,
};

export default AvailablePrograms;

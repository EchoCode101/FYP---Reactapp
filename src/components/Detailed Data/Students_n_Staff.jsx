import PropTypes from "prop-types";

const Students_n_Staff = ({
  heading,
  student_n_staff_total_students_data,
  student_n_staff_international_students_data,
  student_n_staff_total_faculty_data,
}) => {
  const hasStudentNStaffInfo =
    student_n_staff_total_students_data.length > 0 ||
    student_n_staff_international_students_data.length > 0 ||
    student_n_staff_total_faculty_data.length > 0;

  return (
    <>
      {hasStudentNStaffInfo && <h3>{heading}</h3>}
      <div
        className="univ-subsection-full-width"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            borderRight: "2px solid #777777cf",
            minWidth: "400px",
          }}
        >
          {student_n_staff_total_students_data.length !== 0 && (
            <>
              <h5 className="univ-subsection-full-width-title text-decoration-underline">
                Total students
              </h5>
              <div className="univ-subsection-full-width-div row">
                {renderData(student_n_staff_total_students_data)}
              </div>
            </>
          )}
        </div>
        <div style={{ borderRight: "2px solid #777777cf", minWidth: "400px" }}>
          {student_n_staff_international_students_data.length !== 0 && (
            <>
              <h5 className="univ-subsection-full-width-title text-decoration-underline">
                International students
              </h5>
              <div className="univ-subsection-full-width-div row">
                {renderData(student_n_staff_international_students_data)}
              </div>
            </>
          )}
        </div>
        <div>
          {student_n_staff_total_faculty_data.length !== 0 && (
            <>
              <h5 className="univ-subsection-full-width-title text-decoration-underline">
                Total faculty staff
              </h5>
              <div className="univ-subsection-full-width-div row">
                {renderData(student_n_staff_total_faculty_data)}
              </div>
            </>
          )}
        </div>
      </div>
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
          alignItems: "center",
          justifyContent: "center",
          minWidth: "175px",
          maxWidth: "fit-content",
          maxHeight: "100px",
          minHeight: "fit-content",
          margin: "5px",
          backgroundColor: "#fdfdfd",
          textAlign: "start",
          padding: "8px",
          borderRadius: "8px",

          fontSize: "16px",
        }}
      >
        <div>
          <span>{data[i]}</span> :
          <b>
            {" "}
            <label> {data[i - 1]}</label>
          </b>
        </div>
      </div>
    );
  }
  return items;
};

Students_n_Staff.propTypes = {
  heading: PropTypes.string,
  student_n_staff_total_students_data: PropTypes.array,
  student_n_staff_international_students_data: PropTypes.array,
  student_n_staff_total_faculty_data: PropTypes.array,
};

export default Students_n_Staff;

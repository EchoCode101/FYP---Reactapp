import PropTypes from "prop-types";
import GeneralInfoTable from "./GeneralInfoTable";
import UniversityInfoTable from "./UniversityInfoTable";
import Ranking_n_Ratings from "./Ranking_n_Ratings";
import AvailablePrograms from "./AvailablePrograms";
import Students_n_Staff from "./Students_n_Staff";
import TuitionFee from "./TuitionFee";
import CampusLocations from "./CampusLocations";
import Maps from "./Maps";
import TextSplitter from "./TextSplitter";
const UniversityDetails = ({ document1Data, document2Data }) => {
  return (
    <>
      <div className="mt-5">
        <div
          className="row"
          style={{
            justifyContent: "space-between",
          }}
        >
          <div className="col-lg-8">
            <GeneralInfoTable general_info={document1Data.general_info} />

            {document1Data.about_heading && (
              <h3 className="mt-3">{document1Data.about_heading}</h3>
            )}
            <TextSplitter text={document1Data.about_content} />

            <Ranking_n_Ratings
              Rankings_n_ratings_heading={
                document1Data.Rankings_n_ratings_heading
              }
              Rankings_n_ratings_details={
                document1Data.Rankings_n_ratings_details
              }
              Rankings_n_ratings_ranks={document1Data.Rankings_n_ratings_ranks}
            />
          </div>
          <div className="col-lg-4">
            <img
              style={{
                width: "180px",
                height: "180px",
                objectFit: "contain",
                borderRadius: " 12px",
                border: " 4px solid rgba(127, 127, 127, 0.56)",
                boxShadow: "rgb(9 19 35 / 10%) 0px 0px 6px 4px",
                marginBottom: "30px",
              }}
              src={`../../logo_imgs/${document2Data.image_name}.jpg`}
              className="card-img-top"
              alt={document2Data.image_name}
            />
            <CampusLocations
              campus_locations_heading={document1Data.campus_locations_heading}
              campus_locations_all_locations={
                document1Data.campus_locations_all_locations
              }
            />{" "}
            <TuitionFee
              tuition_fee_domestic={document1Data.tuition_fee_domestic}
              tuition_fee_international={
                document1Data.tuition_fee_international
              }
            />
          </div>
        </div>
        {document1Data.uni_info_facilities && (
          <>
            <h3 className="mt-3">University Ficilities</h3>
            <TextSplitter text={document1Data.uni_info_facilities} />
          </>
        )}
        <UniversityInfoTable
          uni_info_heading={document1Data.uni_info_heading}
          uni_info_admission_general={document1Data.uni_info_admission_general}
          uni_info_admission_bachelor={
            document1Data.uni_info_admission_bachelor
          }
          uni_info_admission_master={document1Data.uni_info_admission_master}
        />
        <Students_n_Staff
          heading="Student and Staff Information"
          student_n_staff_total_students_data={
            document1Data.student_n_staff_total_students_data
          }
          student_n_staff_international_students_data={
            document1Data.student_n_staff_international_students_data
          }
          student_n_staff_total_faculty_data={
            document1Data.student_n_staff_total_faculty_data
          }
        />
        <br />
        <hr />
        <br />
        <AvailablePrograms
          available_programs_heading={document1Data.available_programs_heading}
          available_programs_bachelor={
            document1Data.available_programs_bachelor
          }
          available_programs_master_details={
            document1Data.available_programs_master_details
          }
          available_programs_master={document1Data.available_programs_master}
          available_programs_MBA={document1Data.available_programs_MBA}
          available_programs_phd={document1Data.available_programs_phd}
        />
        {document1Data.student_n_staff_student_life && (
          <>
            <h3>Student Life at {document2Data.image_name}</h3>
            <TextSplitter text={document1Data.student_n_staff_student_life} />
          </>
        )}
        {document1Data.uni_info_careers && (
          <>
            <h3>University Careers</h3>
            <TextSplitter text={document1Data.uni_info_careers} />
            <br />
            <hr />
            <br />
          </>
        )}

        <Maps document1Data={document1Data} document2Data={document2Data} />
      </div>
    </>
  );
};
// Add prop type validation
UniversityDetails.propTypes = {
  document1Data: PropTypes.object,
  document2Data: PropTypes.object,
};

export default UniversityDetails;

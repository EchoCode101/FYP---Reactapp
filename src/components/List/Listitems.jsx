import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Listitems = ({
  name,
  urlToDetails,
  image_name,
  location,
  region,
  rank,
}) => {
  return (
    <div
      className="card my-4 p-3 "
      style={{ marginEnd: "auto", maxHeight: "250px", minHeight: "205px" }}
    >
      <div className="d-flex">
        <img
          style={{
            width: "120px",
            height: "120px",
            objectFit: "contain",
            borderRadius: " 4px",
            border: " 4px solid rgb(127 127 127 / 56%)",
            boxShadow: "rgb(0 0 0 / 11%) 0px 0px 20px 3px",
          }}
          src={`../../logo_imgs/${image_name}.jpg`}
          className="card-img-top"
          alt={name}
        />
        <div
          className="card-body p-2 pt-0"
          style={{
            overflow: "auto",
          }}
        >
          <h5 className="card-title text-start">
            {name} <div className="text-end"></div>
          </h5>

          <div className="d-block">
            <p className="card-text">{location}</p>

            <hr style={{ margin: "0 " }} />
            <p
              className="card-text d-flex mt-2"
              style={{
                textAlign: "right",
                margin: "0 10px 5px 0",
                fontSize: ".99rem",
                justifyContent: "space-between",
              }}
            >
              <span
                className={`badge rounded-pill text-bg text-center`}
                style={{ width: "fit-content" }}
              >
                Rank: {rank}
              </span>
              <small className="text-muted ">
                Region: <b>{!region ? "Unknown" : region}</b>
              </small>
            </p>
          </div>
        </div>
      </div>
      <Link
        style={{ position: "absolute", bottom: "10px", width: "95%" }}
        to={`/all_universities${urlToDetails}`}
        className="btn btn-sm btn-light"
        rel="noreferrer"
      >
        See Details
      </Link>
    </div>
  );
};
Listitems.propTypes = {
  name: PropTypes.string,
  urlToDetails: PropTypes.string,
  location: PropTypes.string,
  region: PropTypes.string,
  image_name: PropTypes.string,
  rank: PropTypes.string,
};
export default Listitems;

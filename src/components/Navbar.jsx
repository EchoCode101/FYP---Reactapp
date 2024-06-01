import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [currUser, setCurrUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrUser(null);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-dark border-bottom border-body">
        <div className="container">
          <div className="logo">
            <img
              src="/siteLogo1.png"
              alt="logo"
              style={{
                width: "45px",
                objectFit: "contain",
              }}
            />
            <Link className="navbar-brand" to="/">
              UniPursuit
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ color: "#63e98f", backgroundColor: "white" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {currUser ? (
              <>
                <ul className="navbar-nav mt-1 mb-lg-0 ul_navbar">
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/search">
                      Search
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/all_universities"
                    >
                      International Universities Ranking
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/WorldsUnies_and_Domains"
                    >
                      World Universities & Their Domains
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/programs"
                    >
                      Degree Programs for Masters
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/intermediate_programs"
                    >
                      Degree Programs for Bachelors
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/about_us"
                    >
                      About Us
                    </Link>
                  </li>
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                  <li className="nav-item">
                    <button
                      className="nav-link logout_btn"
                      onClick={handleLogout}
                    >
                      <span className="logout-text">Logout</span>
                      <i className="fa-solid fa-arrow-right-from-bracket logout-icon"></i>
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item mx-1 my-2">
                  <Link className="nav-link login_btn" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-1">
                  <Link className="nav-link  signup_btn" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

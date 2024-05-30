import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Error from "../Error";

const LoginForm = ({ setProgress }) => {
  useEffect(() => {
    (() => {
      "use strict";

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll(".needs-validation");

      // Loop over them and prevent submission
      Array.from(forms).forEach((form) => {
        form.addEventListener(
          "submit",
          (event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    })();
  }, []);

  const [response, setResponse] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ errorTitle: null, errorMessage: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Regular expression to allow only alphanumeric characters and underscores
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (!usernameRegex.test(username)) {
      setError({
        errorTitle: "Invalid Username",
        errorMessage:
          "Username can only contain letters, numbers, and underscores.",
      });
      return;
    }

    try {
      setProgress(20);
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      setProgress(50);
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const responseData = await response.json();
      console.log(responseData);
      console.log(responseData.currUser);
      if (response.status === 200) {
        console.log("User logged in successfully");
        localStorage.setItem(
          "currentUser",
          JSON.stringify(responseData.currUser)
        );
        setResponse(responseData);
        window.dispatchEvent(new Event("userLoggedIn")); // Trigger userLoggedIn event
        window.location.href = "http://localhost:5173"; // Redirect to home page
      } else {
        console.log("User not found");
      }
      setProgress(100);
    } catch (error) {
      setError({
        errorTitle: "Invalid Username or Password",
        errorMessage:
          "Username can only contain letters, numbers, and underscores.",
      });
      setProgress(20);

      // setTimeout(() => {
      //   window.location.href = "http://localhost:5173/login"; // Redirect to home page
      // }, 2500);
    }
  };

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    const usernameRegex = /^[a-zA-Z0-9_]*$/;

    if (usernameRegex.test(value)) {
      setUsername(value);
    } else {
      setError({
        errorTitle: "Invalid Character",
        errorMessage:
          "Username can only contain letters, numbers, and underscores.",
      });
    }
  };

  return (
    <>
      <div
        className="mt-5"
        style={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {response.status !== 200 ? (
          <Error
            errorMessage={{
              errorTitle: error.errorTitle,
              errorMessage: error.errorMessage,
            }}
          />
        ) : (
          ""
        )}
        <div>
          <h2>Login to UniPursuit</h2>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3" style={{ width: "400px" }}>
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                minLength={3} // Set min length
                maxLength={30} // Set max length
                onChange={handleUsernameChange}
                required
              />
              <div className="invalid-feedback">
                Please provide a valid username.
              </div>
            </div>
            <div className="mb-3" style={{ width: "400px" }}>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                minLength={5}
                maxLength={20} // Set max length
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Password must be at least 8 characters long.
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <br />
        </div>
      </div>
    </>
  );
};

LoginForm.propTypes = {
  setProgress: PropTypes.func,
};

export default LoginForm;

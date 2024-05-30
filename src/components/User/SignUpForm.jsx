import { useState, useEffect } from "react";
import Error from "../Error"; // Make sure to import the Error component

const SignUpForm = () => {
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

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [passwordError, setPasswordError] = useState("");
  const [response, setResponse] = useState(null); // New state for response
  const [error, setError] = useState({ errorTitle: null, errorMessage: null }); // New state for error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usernameError || emailError || passwordError) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        setError({
          errorTitle: "Registration Error",
          errorMessage: "User already exists. Please try again.",
        });
        setResponse(response);
        return;
      }

      // eslint-disable-next-line no-unused-vars
      const responseData = await response.json();
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ username, email })
      );
      window.dispatchEvent(new Event("userLoggedIn"));
      window.location.href = "http://localhost:5173/"; // Redirect to home page
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError({
        errorTitle: "Registration Error",
        errorMessage: "Failed to sign up. Please try again later.",
      });
      setResponse({ status: 500 }); // Setting a dummy response status to trigger the Error component
    }
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      setUsernameError(
        "Username can only contain letters, numbers, and underscores."
      );
    } else {
      setUsernameError("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please provide a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // const validatePassword = (password) => {
  //   const passwordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   if (!passwordRegex.test(password)) {
  //     setPasswordError(
  //       "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character."
  //     );
  //   } else {
  //     setPasswordError("");
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
      validateUsername(value);
    }
    if (name === "email") {
      setEmail(value);
      validateEmail(value);
    }
    if (name === "password") {
      setPassword(value);
      // validatePassword(value);
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
        {response && response.status !== 200 && (
          <Error
            errorMessage={{
              errorTitle: error.errorTitle,
              errorMessage: error.errorMessage,
            }}
          />
        )}
        <div>
          <h2>Sign Up to UniPursuit</h2>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3" style={{ width: "400px" }}>
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className={`form-control ${usernameError ? "is-invalid" : ""}`}
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                minLength={3} // Set min length
                maxLength={30} // Set max length
                required
              />
              <div className="invalid-feedback">{usernameError}</div>
            </div>
            <div className="mb-3" style={{ width: "400px" }}>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${emailError ? "is-invalid" : ""}`}
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                minLength={5}
                maxLength={30} // Set max length
                required
              />
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">{emailError}</div>
            </div>
            <div className="mb-3" style={{ width: "400px" }}>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${passwordError ? "is-invalid" : ""}`}
                id="password"
                name="password"
                value={password}
                minLength={5} // Set min length
                onChange={handleChange}
                maxLength={20} // Set max length
                required
              />
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">{passwordError}</div>
            </div>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;

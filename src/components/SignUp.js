import React, { useState } from "react";
import logo from "../images/3-scorer-logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "email" && !validateEmail(value)) {
      setErrorMessage("Invalid email format");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!validateEmail(formData.email)) {
      setErrorMessage("Invalid email format");
      return;
    }

    if (formData.password.length < 6) {
      setPasswordError("Password should be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      setRepeatPasswordError("Passwords do not match.");
      return;
    }

    // Reset the error messages if there were previous errors
    setPasswordError("");
    setRepeatPasswordError("");
    setErrorMessage("");

    // Create the signupPayload from formData
    const signupPayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      repeat_password: formData.repeatPassword,
    };

    // Send signupPayload to the API using fetch
    fetch("https://test.3scorers.com/api/v1/admin/sign-up/?adminId=1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupPayload),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);

        if (data.success) {
          // Successful signup
          console.log("Signup success:", data);

          navigate("/login");
          // Check if there's a token in the response data
          if (data.token) {
            // Store the token or use it as needed
            console.log("Received token:", data.token);
          }
        } else {
          // Unsuccessful signup, handle error
          console.log("Signup failed:", data.message);
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Signup error:", error.message);
      });
  };
  return (
    <div className="sign-up">
      <div className="page">
        <img src={logo} alt="3-scorers-logo" />
        <h3>Create Account</h3>
        <p>Join the community and have fun predicting</p>
      </div>
      <div className="form">
        <p>
          Already have an account?{" "}
          <Link className="to-login" to="/login">
            login
          </Link>
        </p>
        <form>
          <label>
            <p>Firstname</p>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              placeholder="Firstname"
              required
            />
          </label>
          <label>
            <p>Lastname</p>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Lastname"
              required
            />
          </label>
          <label>
            <p>Username</p>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              placeholder="Username"
              required
            />
          </label>
          <label>
            <p>
              Email Address{" "}
              {errorMessage && (
                <span className="error-message">{errorMessage}</span>
              )}
            </p>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              required
            />
          </label>
          <label>
            <p>
              Password{" "}
              {passwordError && (
                <span className="error-message">{passwordError}</span>
              )}
            </p>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="password"
              required
            />
          </label>
          <label>
            <p>
              Confirm Password{" "}
              {repeatPasswordError && (
                <span className="error-message">{repeatPasswordError}</span>
              )}
            </p>
            <input
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="password"
              required
            />
          </label>
        </form>
        <button onClick={handleSubmit} type="submit" className="submit-btn">
          Sign Up
        </button>
      </div>
    </div>
  );
}

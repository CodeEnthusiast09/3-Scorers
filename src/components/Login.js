import React, { useState } from "react";
import logo from "../images/3-scorer-logo.png";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create the loginPayload from formData
    const loginPayload = {
      email: formData.email,
      password: formData.password,
    };

    // Send loginPayload to the API using fetch
    fetch("https://test.3scorers.com/api/v1/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginPayload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Successful login, set isAuthenticated to true
          console.log("Login success:", data);
          localStorage.setItem("token", data.accessToken);
          setIsAuthenticated(true);

          navigate("/overview"); // Navigate to the "/overview" route
        } else {
          if (data.message === "Auth token has expired, please login again") {
            setErrorMessage(data.message); // Set the error message
            localStorage.removeItem("token");
          } else {
            console.log("Login failed:", data.message);
            setErrorMessage("Login failed. Please check your credentials.");
          }
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Login error:", error.message);
        setErrorMessage("An error occurred during login. Please try again.");
      });
  };

  // If the user is already authenticated, redirect to the Overview page
  if (isAuthenticated) {
    navigate("/overview"); // Navigate to the "/overview" route
    return null; // Return null to avoid rendering the rest of the component
  }

  return (
    <div className="login">
      <div className="container">
        <img src={logo} alt="3-scorers-logo" />
        <form className="login-form">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <label>
            <p>Email Address</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              autoComplete="email"
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="current-password"
            />
          </label>
          <button onClick={handleSubmit} type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

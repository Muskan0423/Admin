import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5001/api/admin/signup`, {
        username,
        password,
      });

      setSuccessMessage("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="login">
      <div className="login_box">
        <div className="login_header">
          <h1 className="headl">Sign Up</h1>
          <div className="signup">
            Create your account here. Already have an account? <a href="/">Login</a>
          </div>
        </div>
        <div className="login_form">
          <form onSubmit={handleSubmit}>
            <label className="input">
              Username
              <input
                className="input_edit"
                placeholder="Enter your username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <br />
            <label className="input">
              Password
              <input
                className="input_edit"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <br />
            <div className="submit">
              <button className="login_button" type="submit">
                Sign Up
              </button>
            </div>
            {errorMessage && <div className="error">{errorMessage}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

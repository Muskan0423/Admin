import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserLogin } from "../../User_Management/features/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5001/api/admin/login`, {
        username,
        password,
      });

      const token = response.data.token; 
      localStorage.setItem("jwt", token);
      await dispatch(getUserLogin(response.data.uid));
      setSuccessMessage("Logged in successfully! Redirecting...");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login">
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <div className="login_box">
        <div className="login_header">
          <h1 className="headl">Login</h1>
        </div>
        <div className="login_form">
          <form onSubmit={handleSubmit}>
            <label className="input">
              Username
              <input
                className="input_edit"
                required
                placeholder="Enter your username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              />
            </label>
            <br />
            <div className="submit">
              <button className="login_button" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

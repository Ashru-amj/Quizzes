// src/components/RegisterPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";
const RegisterPage = () => {
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
  
    const handleRegister = async (e) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        console.error("Passwords do not match");
        return;
      }
  
      try {
        const response = await axios.post("http://localhost:5555/users/register", {
          name,
          email,
          password,
          confirmPassword,
        });
       console.log(response);
        if (response && response.data && response.data.token) {
          localStorage.setItem("userToken", response.data.token);
          // Redirect or perform other actions upon successful registration
          navigate("/dashboard");
        } else {
          console.error("Registration failed: Token not received");
        }
      } catch (error) {
        console.error("Registration failed", error.response.data.error);
        // Display error message to the user
      }
    };

  return (
    <div className="form-container">
      <div className="form">
        <form className="modal-form" onSubmit={handleRegister}>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-col">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-col">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-col">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <div className="form-col">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="q-btn-signup" onClick={handleRegister}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

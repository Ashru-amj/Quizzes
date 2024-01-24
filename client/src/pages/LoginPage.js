// src/components/LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5555/users/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);
        navigate("/dashboard");
      } else {
        console.error("Login failed: Token not received");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="form-container">
      <div className="form">
        <form className="modal-form" onSubmit={handleLogin}>
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
          <button className="q-btn-signup" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

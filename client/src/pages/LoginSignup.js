
import React, { useState } from "react";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import "../../src/App.css";

const LoginSignup = () => {
  

  const [showSignupForm, setShowSignupForm] = useState(true);
  const [selectedButton, setSelectedButton] = useState("signup");

  const showSignup = () => {
    setShowSignupForm(true);
    setSelectedButton("signup");
  };

  const showSignin = () => {
    setShowSignupForm(false);
    setSelectedButton("signin");
  };

  return (
    <div className="q-container">
      <div className="q-title">QUIZZIE</div>
      <div className="q-form-container">
        <div className="q-btn-group">
          <button
            onClick={showSignup}
            className={`btn-signup ${
              selectedButton === "signup" && "selected"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={showSignin}
            className={`btn-signin ${
              selectedButton === "signin" && "selected"
            }`}
          >
            Log In
          </button>
        </div>

        {showSignupForm ? <RegisterPage /> : <LoginPage />}
      </div>
    </div>
  );
};

export default LoginSignup;

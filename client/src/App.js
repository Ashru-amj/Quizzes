
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
// import LoginSignup from './pages/LoginSignup';
// import DashBoard from './pages/DashBoard';

//     function App() {
//       return (
//         <div className="App">
//           <Router>
//             <Routes>
//               <Route path="/" element={<LoginSignup />} />
//               <Route path="/dashboard" element={<DashBoard />} />
//             </Routes>
//           </Router>
//         </div>
//       );
//     }
    
  
// export default App;


import React, { useState } from "react";

import "./App.css";
import { Route, Routes, Navigate, Outlet, useNavigate  } from "react-router-dom";

// import Analytics from "./pages/Analytics";
// import CreateQuiz from "./pages/CreateQuiz";
import LoginSignup from "./pages/LoginSignup";
import DashBoard from "./pages/DashBoard";
import Analytics from "./pages/Analytics";
import QuizAnalytics from "./pages/QuizAnalytics";
import CreateQuiz from "./pages/CreateQuiz";
import Sidebar from "./components/Sidebar";
// import QuestionWise from "./pages/QuestionWise";
// import QuizScreen from "./components/QuizScreen";
import { isAuthenticated } from "./utils/Auth";
import QuizScreen from "./components/QuizScreen";
// import QuizAnalytics from "./pages/QuizAnalytics";
// import DashBoard from "./pages/DashBoard";
// import DashboardContent from "../src/components/DashboardContent"


function PrivateRoute({ element, redirectTo }) {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("userToken");

  if (!isAuthenticated) {
    navigate(redirectTo || "/");
    return null;
  }

  return element;
}

function App() {
  return (

    <div className="App" >
      
      <Routes>
        <Route path="/" element={<LoginSignup/>} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={isAuthenticated ? <DashBoard /> : <Navigate to="/" />}
            />
          }
        />
        <Route
          path="/analytics"
          element={<PrivateRoute element={<Analytics/>} />}
        />
        <Route
          path="/analytics/:quizId"
          element={<PrivateRoute element={<QuizAnalytics/>} />}
        />
        <Route
          path="/create-quiz"
          element={<PrivateRoute element={<CreateQuiz/>} />}
        />
        <Route
          path="/analytics"
          element={<PrivateRoute element={<Analytics/>} />}
        />
        <Route path="/quiz/:id" element={<QuizScreen/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
    </div>
  );
}

export default App;

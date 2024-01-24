
import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginSignup from './pages/LoginSignup';
import DashBoard from './pages/DashBoard';

    function App() {
      return (
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<LoginSignup />} />
              <Route path="/dashboard" element={<DashBoard />} />
            </Routes>
          </Router>
        </div>
      );
    }
    
  
export default App;

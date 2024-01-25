import React from "react";
import "../../src/App.css";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="q-dashboard-section">
        <Sidebar />
        {children}
      </div>
    </>
  );
}

export default MainLayout;

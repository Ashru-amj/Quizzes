import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import "../../src/App.css";


const DashboardContent =() =>{
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true); // Initialize loading to true

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    axios
      .get(`${BACKEND_URL}/starts`, {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        
        setData(response.data);
        
      })
      .catch((error) => {
        console.error("API request failed", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false regardless of success or failure
      });
  }, []);

 
  return (
    <div>
      <div className="content">
        <div className="q-top-cards">
          <div className="q-top-card">
            <div className="q-num-text1">{data?.quizzes}</div>
            <div className="q-text1">Quiz Created</div>
          </div>
          <div className="q-top-card">
            <div className="q-num-text2">{data?.questions}</div>
            <div className="q-text2">Question Created</div>
          </div>
          <div className="q-top-card">
            <div className="q-num-text3">
              {data?.impression > 1000
                ? (data?.impression / 1000).toFixed(2) + "K"
                : data?.impression}
            </div>
            <div className="q-text3">Total Impressions</div>
          </div>
        </div>

        <div className="q-title3">
          <h1>Trending Quizs</h1>
        </div>

        <div className="q-trend-cards">
          {data?.trendy?.map((quiz, index) => {
            return (
              <div className="q-trend-card" key={index + 1}>
                <div className="q-trend-card-wrap">
                  <div className="q-trend-card-title">{quiz.title}</div>
                  <div className="q-trend-card-title-num">
                    <span className="num2">{quiz.impressionCount}</span>
                    <span className="icon1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M9 15.375C12.7279 15.375 15.75 12.2542 15.75 10.125C15.75 7.99575 12.7279 4.875 9 4.875C5.27213 4.875 2.25 7.998 2.25 10.125C2.25 12.252 5.27213 15.375 9 15.375Z"
                          stroke="#FF5D01"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 12.375C9.59674 12.375 10.169 12.1379 10.591 11.716C11.0129 11.294 11.25 10.7217 11.25 10.125C11.25 9.52826 11.0129 8.95597 10.591 8.53401C10.169 8.11205 9.59674 7.875 9 7.875C8.40326 7.875 7.83097 8.11205 7.40901 8.53401C6.98705 8.95597 6.75 9.52826 6.75 10.125C6.75 10.7217 6.98705 11.294 7.40901 11.716C7.83097 12.1379 8.40326 12.375 9 12.375Z"
                          stroke="#FF5D01"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.974 4.22475L5.94675 5.58225M13.3594 4.39125L12.3862 5.74875M9.00337 2.625V4.875"
                          stroke="#FF5D01"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="q-trend-card-text1">
                  Created on :{" "}
                  {new Date(quiz.createdAt).toLocaleDateString("en-us", {
                    dateStyle: "medium",
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;

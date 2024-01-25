import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import "../../src/App.css";
function QuestionWiseContent() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const quizId = window.location.pathname.split("/")[2];
    console.log(quizId);
    axios
      .get(`${BACKEND_URL}/quizzes/read/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("API request failed", error);
        setLoading(false);
      });
  }, []);
  console.log(data);

  useEffect(() => {
    if (Object.keys(data).length === 0) return;
    axios
      .get(`${BACKEND_URL}/questions/${data._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API request failed", error);
        setLoading(false);
      });
  }, [data]);
  console.log(questions);

  return (
    <div className="content">
      <div className="q-title4-wrap">
        <div className="q-title4">{data.title}</div>
        <div className="q-text4">
          Created on:
          {new Date(data.createdAt).toLocaleDateString("en-us", {
            dateStyle: "medium",
          })}
          <br />
          Impressions: {data.impressionCount}
        </div>
      </div>
      <div className="q-questions-container">
        {questions.map((question, index) => (
          <div key={index + 1}>
            <>
              <div className="q-question1">
                Q{index + 1} {question.text}
              </div>
              <div className="q-question-cards1">
                <div className="q-question-card1">
                  <span className="q-question-card-num">
                    {question.attempt}
                  </span>
                  <br />
                  <span className="q-question-card-text">
                    people Attempted the question
                  </span>
                </div>
                <div className="q-question-card1">
                  <span className="q-question-card-num">
                    {question.correct}
                  </span>
                  <br />
                  <span className="q-question-card-text">
                    people Answered correctly
                  </span>
                </div>
                <div className="q-question-card1">
                  <span className="q-question-card-num">
                    {question.incorrect}
                  </span>
                  <br />
                  <span className="q-question-card-text">
                    people Answered Incorrectly
                  </span>
                </div>
              </div>
            </>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionWiseContent;

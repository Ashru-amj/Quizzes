import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import "../../src/App.css";

function CreateQuizContent({
  isOpen,
  onClose,
  selectQuizType,
  handleCreateQuestion,
  quizType,
  setQuizId,
}) {
  const [title, setTitle] = useState("");

  const closeQuizTypeModal = async () => {
    if (!quizType) return;
    const token = localStorage.getItem("userToken");
    handleCreateQuestion();
    const res = await axios.post(
      `${BACKEND_URL}/quizzes`,
      { title, type: quizType },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setQuizId(res.data._id);

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="content">
      <div className="q-modal-container">
        <div className="q-modal">
          <div className="q-modal-content">
            <input
              type="text"
              placeholder="Quiz Name"
              className="q-quiz-name"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <div className="q-quiz-type-wrap">
              <label>Quiz Type</label>
              <button onClick={() => selectQuizType("Q&A")}>Q & A</button>
              <button onClick={() => selectQuizType("Poll")}>Poll Type</button>
            </div>
            <div className="q-modal-button-wrap">
              <button className="q-modal-button2" onClick={onClose}>
                Cancel
              </button>

              <button
                className="q-quiz-continue-btn"
                onClick={closeQuizTypeModal}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default CreateQuizContent;

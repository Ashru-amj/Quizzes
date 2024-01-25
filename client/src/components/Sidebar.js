import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../src/App.css";
import CreateQuizContent from "./CreateQuizContent";
import CreateQuestionContent from "./CreateQuestionContent";
import QuizPublish from "./QuizPublish";

function Sidebar() {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const navigateToAnalytics = () => {
    navigate("/analytics");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateQuestionModalOpen, setIsCreateQuestionModalOpen] =
    useState(false);
  const [selectedQuizType, setSelectedQuizType] = useState(null);
  const [isCreateQuizOpen, setCreateQuizOpen] = useState(false);
  const [quizId, setQuizId] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateQuestionOpenModal = () => {
    setIsCreateQuestionModalOpen(true);
  };

  const handleCreateQuestionCloseModal = () => {
    setIsCreateQuestionModalOpen(false);
  };

  const handleSelectQuizType = (quizType) => {
    setSelectedQuizType(quizType);
  };

  const handleOpenCreateQuiz = () => {
    setCreateQuizOpen(true);
  };
  const handleCloseCreateQuiz = () => {
    setCreateQuizOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <div>
      {" "}
      <div className="sidebar">
        <div className="q-sidebar-title">QUIZZIE</div>
        <div className="q-sidebar-btn-routes">
          <button className="sidebar-button" onClick={navigateToDashboard}>
            Dashboard
          </button>
          <button className="sidebar-button" onClick={navigateToAnalytics}>
            Analytics
          </button>
          <button className="sidebar-button" onClick={handleOpenModal}>
            Create Quiz
          </button>
          <CreateQuizContent
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            selectQuizType={handleSelectQuizType}
            handleCreateQuestion={handleCreateQuestionOpenModal}
            quizType={selectedQuizType}
            setQuizId={setQuizId}
          />
          <CreateQuestionContent
            isOpen={isCreateQuestionModalOpen}
            onClose={handleCreateQuestionCloseModal}
            quizType={selectedQuizType}
            handleCreateQuiz={handleOpenCreateQuiz}
            quizId={quizId}
          />
          <QuizPublish
            isOpen={isCreateQuizOpen}
            onClose={handleCloseCreateQuiz}
            quizId={quizId}
          />
        </div>
        <div className="">
          <hr />
          <button className="sidebar-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

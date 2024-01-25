import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "../config";
import "../../src/App.css";
import CreateQuestionContent from "./CreateQuestionContent";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const AnalyticsContent =({ quiz })=> {
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [quizId, setQuizId] = useState("");
  const [deleted, setDeleted] = useState(false);
  const token = localStorage.getItem("userToken");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isCreateQuestionModalOpen, setIsCreateQuestionModalOpen] =
    useState(false);
  const [selectedQuizType, setSelectedQuizType] = useState(null);
  const [isCreateQuizOpen, setCreateQuizOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateQuestionOpenModal = (quizId) => {
    setIsCreateQuestionModalOpen(true);
    setQuizId(quizId);
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

  const handleOpenDeleteModal = (itemId) => {
    setItemToDelete(itemId);
    setIsModalOpenDelete(true);
  };
  const handleCloseDeleteModal = () => {
    setIsModalOpenDelete(false);
  };

  const copyLink = (quizId) => {
    navigator.clipboard.writeText(`${FRONTEND_URL}/quiz/${quizId}`);
    toast.success("Link copied to Clipboard");
  };

  const getQuizzes = () => {
    axios
      .get(`${BACKEND_URL}/quizzes`, {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("API request failed", error);
        setLoading(false);
      });
  };

  const handleEditQuestion = (quizId) => {
    handleCreateQuestionOpenModal(quizId);
    setUpdate(true);
  };

  useEffect(() => {
    getQuizzes();
  }, []);
  console.log(data);

  useEffect(() => {
    if (quizId && !update) {
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
    }
  }, [quizId]);

  const handleDelete = async (quizId) => {
    setIsModalOpenDelete(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/quizzes/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 204) {
      } else {
        console.error(
          "Quiz deletion failed. Server response:",
          response.status,
          response.data
        );
      }
      setIsModalOpenDelete(false);
      getQuizzes();
    } catch (error) {
      console.error("Quiz deletion failed", error);
    }
  };

  return (
    <div className="content">
      <div className="q-analytics-title">Quiz Analysis</div>
      <div className="table">
        <table>
          <thead style={{ borderRadius: "10px !important" }}>
            <tr className="q-table-title">
              <th>S.No</th>
              <th>Quiz Name</th>
              <th>Created On</th>
              <th>Impressions</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString("en-us", {
                    dateStyle: "medium",
                  })}
                </td>
                <td>{item.impressionCount}</td>
                <td className="icon-btn">
                  <span onClick={() => handleEditQuestion(item._id)}>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H11C11.2652 4 11.5196 3.89464 11.7071 3.70711C11.8946 3.51957 12 3.26522 12 3C12 2.73478 11.8946 2.48043 11.7071 2.29289C11.5196 2.10536 11.2652 2 11 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12ZM6 12.76V17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18H11.24C11.3716 18.0008 11.5021 17.9755 11.6239 17.9258C11.7457 17.876 11.8566 17.8027 11.95 17.71L18.87 10.78L21.71 8C21.8037 7.90704 21.8781 7.79644 21.9289 7.67458C21.9797 7.55272 22.0058 7.42201 22.0058 7.29C22.0058 7.15799 21.9797 7.02728 21.9289 6.90542C21.8781 6.78356 21.8037 6.67296 21.71 6.58L17.47 2.29C17.377 2.19627 17.2664 2.12188 17.1446 2.07111C17.0227 2.02034 16.892 1.9942 16.76 1.9942C16.628 1.9942 16.4973 2.02034 16.3754 2.07111C16.2536 2.12188 16.143 2.19627 16.05 2.29L13.23 5.12L6.29 12.05C6.19732 12.1434 6.12399 12.2543 6.07423 12.3761C6.02446 12.4979 5.99924 12.6284 6 12.76ZM16.76 4.41L19.59 7.24L18.17 8.66L15.34 5.83L16.76 4.41ZM8 13.17L13.93 7.24L16.76 10.07L10.83 16H8V13.17Z"
                        fill="#854CFF"
                      />
                    </svg>
                  </span>
                  <span>
                    <button
                      onClick={() => handleOpenDeleteModal(item._id)}
                      className="btn-delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                          fill="#D60000"
                        />
                      </svg>
                    </button>
                    <DeleteConfirmationModal
                      isOpen={isModalOpenDelete}
                      onDelete={() => handleDelete(itemToDelete)}
                      onClose={handleCloseDeleteModal}
                    />
                  </span>
                  <span>
                    <button
                      onClick={() => copyLink(item._id)}
                      className="btn-copy"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18 22C17.1667 22 16.4583 21.7083 15.875 21.125C15.2917 20.5417 15 19.8333 15 19C15 18.8833 15.0083 18.7623 15.025 18.637C15.0417 18.5117 15.0667 18.3993 15.1 18.3L8.05 14.2C7.76667 14.45 7.45 14.646 7.1 14.788C6.75 14.93 6.38333 15.0007 6 15C5.16667 15 4.45833 14.7083 3.875 14.125C3.29167 13.5417 3 12.8333 3 12C3 11.1667 3.29167 10.4583 3.875 9.875C4.45833 9.29167 5.16667 9 6 9C6.38333 9 6.75 9.071 7.1 9.213C7.45 9.355 7.76667 9.55067 8.05 9.8L15.1 5.7C15.0667 5.6 15.0417 5.48767 15.025 5.363C15.0083 5.23833 15 5.11733 15 5C15 4.16667 15.2917 3.45833 15.875 2.875C16.4583 2.29167 17.1667 2 18 2C18.8333 2 19.5417 2.29167 20.125 2.875C20.7083 3.45833 21 4.16667 21 5C21 5.83333 20.7083 6.54167 20.125 7.125C19.5417 7.70833 18.8333 8 18 8C17.6167 8 17.25 7.92933 16.9 7.788C16.55 7.64667 16.2333 7.45067 15.95 7.2L8.9 11.3C8.93333 11.4 8.95833 11.5127 8.975 11.638C8.99167 11.7633 9 11.884 9 12C9 12.1167 8.99167 12.2377 8.975 12.363C8.95833 12.4883 8.93333 12.6007 8.9 12.7L15.95 16.8C16.2333 16.55 16.55 16.3543 16.9 16.213C17.25 16.0717 17.6167 16.0007 18 16C18.8333 16 19.5417 16.2917 20.125 16.875C20.7083 17.4583 21 18.1667 21 19C21 19.8333 20.7083 20.5417 20.125 21.125C19.5417 21.7083 18.8333 22 18 22Z"
                          fill="#60B84B"
                        />
                      </svg>
                    </button>
                    <ToastContainer />
                  </span>
                </td>
                <td>
                  <Link
                    to={`/analytics/${item._id}?type=${item.type}`}
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    Question wise Analysis
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateQuestionContent
        isOpen={isCreateQuestionModalOpen}
        onClose={handleCreateQuestionCloseModal}
        quizType={selectedQuizType}
        handleCreateQuiz={handleOpenCreateQuiz}
        quizId={quizId}
      />
    </div>
  );
}

export default AnalyticsContent;

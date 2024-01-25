import React, { useState ,useEffect} from 'react';

import axios from "axios";
import { BACKEND_URL } from "../config";
import "../../src/App.css";

const CreateQuestionContent = (isOpen,
    onClose,
    onContinue,
    quizType,
    handleCreateQuiz,
    quizId) => {
 
        const [selectedOption, setSelectedOption] = useState("text");
        const [options, setOptions] = useState([
          { seq: 1, isCorrect: false, optionText: "", optionImage: "" },
          { seq: 2, isCorrect: false, optionText: "", optionImage: "" },
        ]);
      
        // const [questions, setQuestions] = useState([
        //   {
        //     questionText: "",
        //     options: [],
        //     intervalTime: 0,
        //     selectedOption: "text",
        //     seq: 1,
        //   },
        // ]);
      
        const [questions, setQuestions] = useState([
          {
            questionText: "",
            options: [],
            intervalTime: 0,
            selectedOption: "text",
            seq: 1,
          },
        ]);
        
        const [questionText, setQuestionText] = useState("");
        const [intervalTime, setIntervalTime] = useState(0);
        const [currentQuestion, setCurrentQuestion] = useState([1]);
        const [selectQuestion, setSelectQuestion] = useState(1);
        const [optionText, setOptionText] = useState("");
        const [optionImage, setOptionImage] = useState("");
        // const [optionTextImage, setOptionTextImage] = useState();
        const [correctAnswer, setCorrectAnswer] = useState([null]);
        const [correctAnswers, setCorrectAnswers] = useState([]);
      
        const handleOptionChange = (event) => {
          setSelectedOption(event.target.value);
          // setOptions([
          //   { seq: 1, isCorrect: false, optionText: "", optionImage: "" },
          //   { seq: 2, isCorrect: false, optionText: "", optionImage: "" },
          // ]);
          setOptions((prevOptions) => {
            return prevOptions.map((opt) => {
              return {
                ...opt,
                //   isCorrect: false, // Clear all previous correct answers
                isCorrect: opt.seq === correctAnswer,
              };
            });
          });
          setCorrectAnswer(null);
        };
      
        const handleAddOption = () => {
          if (options.length >= 4) return;
          setOptions([
            ...options,
            {
              seq: options.length + 1,
              isCorrect: false,
              optionText: "",
              optionImage: "",
            },
          ]);
          setOptionText("");
          setOptionImage("");
        };
      
        const handleDeleteOption = (id) => {
          setOptions((prev) => {
            return prev.filter((opt) => {
              return opt.seq !== id;
            });
          });
        };
      
        const handleAddQuestion = async () => {
          if (questions.length < 5) {
            const optionsWithCorrectAnswer = options.map((opt) => ({
              ...opt,
              isCorrect: opt.seq === correctAnswer,
            }));
      
            const question = {
              questionText,
              intervalTime,
              selectedOption,
              options: optionsWithCorrectAnswer,
              seq: currentQuestion.length + 1,
            };
            setQuestions([...questions, question]);
            setCurrentQuestion((prev) => {
              const newQuestion = prev.length + 1;
              return [...prev, newQuestion];
            });
            setCorrectAnswers((prevCorrectAnswers) => [
              ...prevCorrectAnswers,
              correctAnswer,
            ]);
            setCorrectAnswer(null);
            handleReset();
          } else {
            alert("Maximum limit of 5 questions reached.");
          }
        };
      
        const handleReset = () => {
          console.log("Resetting form values");
          setQuestionText("");
      
          setIntervalTime(0);
          setOptionText("");
          setOptionImage("");
          setSelectedOption("text");
          setOptions([
            { seq: 1, isCorrect: false },
            { seq: 2, isCorrect: false },
          ]);
        };
      
        // useEffect(() => {
        //   const currentQuestionObject = questions[selectQuestion - 1];
        //   // currentQuestionObject.questionText = questionText;
        //   currentQuestionObject.questionText = questionText;
      
        //   currentQuestionObject.intervalTime = intervalTime;
        //   currentQuestionObject.selectedOption = selectedOption;
        //   const optionsWithCorrectAnswer = options.map((opt) => ({
        //     ...opt,
        //     isCorrect: opt.seq === correctAnswer,
        //   }));
      
      
      
      
        //   currentQuestionObject.options = optionsWithCorrectAnswer;
        //   console.log(currentQuestionObject);
        //   const newQuestions = [...questions];
        //   newQuestions[selectQuestion - 1] = currentQuestionObject;
        //   setQuestions(newQuestions);
        // }, [questionText, intervalTime, selectedOption, options, correctAnswer]);
      
        useEffect(() => {
          const currentQuestionObject = { ...questions[selectQuestion - 1] };
          currentQuestionObject.questionText = questionText;
          currentQuestionObject.intervalTime = intervalTime;
          currentQuestionObject.selectedOption = selectedOption;
          
          // Make sure to handle the 'options' and 'correctAnswer' updates based on your logic
          
          const newQuestions = [...questions];
          newQuestions[selectQuestion - 1] = currentQuestionObject;
          setQuestions(newQuestions);
        }, [questionText, intervalTime, selectedOption, options, correctAnswer]);
        
      
        const handleDeleteQuestion = (id) => {
          if (questions.length <= 1) {
            return;
          }
          setCurrentQuestion((prev) => {
            return prev.filter((que) => {
              return que !== id;
            });
          });
      
          setQuestions((prev) => {
            let newQuestions = prev.filter((que) => {
              return que.seq !== id;
            });
      
            newQuestions = newQuestions.map((que, index) => ({
              ...que,
              seq: index + 1,
            }));
            return newQuestions;
          });
        };
      
        const handleQuestionClick = (questionNum) => {
          setSelectQuestion(questionNum);
          const currentQuestionObject = [...questions.reverse()][questionNum - 1];
          setQuestionText(currentQuestionObject.questionText);
          setOptions(currentQuestionObject.options);
      
          setIntervalTime(currentQuestionObject.intervalTime);
          setSelectedOption(currentQuestionObject.selectedOption);
          const correctAnswerForQuestion = correctAnswers[questionNum - 1];
          setCorrectAnswer(correctAnswerForQuestion);
          console.log(currentQuestionObject);
          console.log(questionNum);
        };
      
        const handleCreateQuizAndContinue = async (e) => {
         
          onClose();
          handleCreateQuiz();
          const token = localStorage.getItem("userToken");
          await axios.post(
            `${BACKEND_URL}/questions`,
            { questions, quizId },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          //  setOptionImage("")
          //  setOptionText("")
          //setQuestions("");
      
          setCurrentQuestion([1]);
          handleReset();
        };
      
        useEffect(() => {
          const getQuestions = async () => {
            const token = localStorage.getItem("userToken");
            const res = await axios.get(
              `${BACKEND_URL}/questions/${quizId}`,
              // { questions, quizId },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            console.log(res.data);
            setQuestions(res.data);
            // setCurrentQuestion([1]);
            setCurrentQuestion([1]);
          };
      
          if (quizId) getQuestions();
        }, [quizId]);
      
        if (!isOpen) {
          return null;
        }
        console.log(quizId);
        console.log(questions);
      
        return (
          <div className="content">
            <div className="q-modal-container">
              <div className="q-modal">
                <div className="q-modal-content">
                  <div className="q-quiz-head">
                    <div className="q-quiz-num">
                      {currentQuestion.map((num, index) => {
                        return (
                          <span
                            key={index}
                            onClick={handleQuestionClick.bind(null, num)}
                          >
                            {index + 1}
                            <div
                              style={{ marginTop: "-50px", marginRight: "-10px" }}
                              onClick={handleDeleteQuestion.bind(null, num)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                              >
                                <path
                                  d="M9.5553 6.34619L3.46155 12.4399M3.46155 6.34619L9.5553 12.4399"
                                  stroke="#474444"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </span>
                        );
                      })}
                      <span onClick={handleAddQuestion}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="42"
                          height="42"
                          viewBox="0 0 42 42"
                          fill="none"
                        >
                          <path
                            d="M33.5 14H23V24.5H19.5V14H9V10.5H19.5V0H23V10.5H33.5V14Z"
                            fill="#969696"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="q-max-text">Max 5 questions</div>
                  </div>
                  <div className="q-quiz-question1">
                    <input
                      type="text"
                      placeholder="Quiz Question"
                      className="q-quiz-question"
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                    />
                  </div>
                  <div className="q-option-type">
                    <label>Option Type</label>
      
                    <label className="container">
                      <input
                        type="radio"
                        value="text"
                        checked={selectedOption === "text"}
                        onChange={handleOptionChange}
                      />{" "}
                      Text
                    </label>
                    <label className="container">
                      <input
                        type="radio"
                        value="image"
                        checked={selectedOption === "image"}
                        onChange={handleOptionChange}
                      />{" "}
                      Image Url
                    </label>
                    <label className="container">
                      <input
                        type="radio"
                        value="textAndImage"
                        checked={selectedOption === "textAndImage"}
                        onChange={handleOptionChange}
                      />{" "}
                      Text & Image url
                    </label>
                  </div>
      
                  <div className="q-options-wrap">
                    <div className="q-option">
                      {selectedOption === "text" && (
                        <>
                          {options.map((opt, ind) => {
                            console.log(opt);
                            return (
                              <>
                                <div key={opt.seq} className="q-option1">
                                  <input
                                    type="radio"
                                    name={`correctAnswer-${selectQuestion}`}
                                    checked={correctAnswer === opt.seq}
                                    onChange={() => {
                                      console.log("Setting correct answer:", opt.seq);
                                      setCorrectAnswer(opt.seq);
                                    }}
                                  />
                                  <input
                                    type="text"
                                    placeholder="Text"
                                    className="q-option-input"
                                    value={opt.optionText}
                                    onChange={(e) => {
                                      setOptionText(e.target.value);
                                      opt.optionText = e.target.value;
                                    }}
                                  />
      
                                  {ind > 1 && (
                                    <span
                                      onClick={handleDeleteOption.bind(null, opt.seq)}
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
                                    </span>
                                  )}
                                </div>
                              </>
                            );
                          })}
                        </>
                      )}
                      {selectedOption === "image" && (
                        <>
                          {options.map((opt, ind) => {
                            return (
                              <>
                                <div className="q-option1">
                                  <input
                                    type="radio"
                                    name={`correctAnswer-${selectQuestion}`}
                                    checked={correctAnswer === opt.seq}
                                    onChange={() => {
                                      console.log("Setting correct answer:", opt.seq);
                                      setCorrectAnswer(opt.seq);
                                    }}
                                  />
      
                                  <input
                                    type="text"
                                    placeholder="Image Url"
                                    className="q-option-input"
                                    value={opt.optionImage}
                                    onChange={(e) => {
                                      setOptionImage(e.target.value);
                                      opt.optionImage = e.target.value;
                                    }}
                                  />
                                  {ind > 1 && (
                                    <span
                                      onClick={handleDeleteOption.bind(null, opt.seq)}
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
                                    </span>
                                  )}
                                </div>
                              </>
                            );
                          })}
                        </>
                      )}
                      {selectedOption === "textAndImage" && (
                        <>
                          {options.map((opt, ind) => {
                            return (
                              <>
                                <div className="q-option1">
                                  <input
                                    type="radio"
                                    name={`correctAnswer-${selectQuestion}`}
                                    checked={correctAnswer === opt.seq}
                                    onChange={() => {
                                      console.log("Setting correct answer:", opt.seq);
                                      setCorrectAnswer(opt.seq);
                                    }}
                                  />
      
                                  <input
                                    type="text"
                                    placeholder="Text"
                                    className="q-option-input"
                                    value={opt.optionText}
                                    onChange={(e) => {
                                      setOptionText(e.target.value);
                                      opt.optionText = e.target.value;
                                    }}
                                  />
                                  <input
                                    type="text"
                                    placeholder="Image Url"
                                    className="q-option-input"
                                    value={opt.optionImage}
                                    onChange={(e) => {
                                      setOptionImage(e.target.value);
                                      opt.optionImage = e.target.value;
                                    }}
                                  />
                                  {ind > 1 && (
                                    <span
                                      onClick={handleDeleteOption.bind(null, opt.seq)}
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
                                    </span>
                                  )}
                                </div>
                              </>
                            );
                          })}
                        </>
                      )}
                      <div className="q-option1">
                        {options.length < 4 && (
                          <>
                            <button
                              onClick={handleAddOption}
                              className="q-option-input"
                            >
                              Add Option
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="q-timer-wrap">
                      {quizType === "Q&A" && (
                        <div className="q-timer">
                          <div className="q-timer-text">Timer</div>
                          <button
                            onClick={() => setIntervalTime(0)}
                            className={`${
                              intervalTime === 0 && "q-timer-wrap-active "
                            }`}
                          >
                            Off
                          </button>
                          <button
                            onClick={() => setIntervalTime(5)}
                            className={`${
                              intervalTime === 5 && "q-timer-wrap-active "
                            }`}
                          >
                            5 sec
                          </button>
                          <button
                            onClick={() => setIntervalTime(10)}
                            className={`${
                              intervalTime === 10 && "q-timer-wrap-active "
                            }`}
                          >
                            10 sec
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
      
                  <div className="q-modal-button-wrap">
                    <button className="q-modal-button2" onClick={onClose}>
                      Cancel
                    </button>
                    <button
                      className="q-quiz-continue-btn"
                      onClick={handleCreateQuizAndContinue}
                      
                    >
                     
                      Create Quiz
                    </button>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        );



};

export default CreateQuestionContent;

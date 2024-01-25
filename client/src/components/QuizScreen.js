// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../config";

// function formatTime(seconds) {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;
//   const formattedMinutes = String(minutes).padStart(2, "0");
//   const formattedSeconds = String(remainingSeconds).padStart(2, "0");
//   return `${formattedMinutes}:${formattedSeconds}`;
// }

// function QuizScreen() {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [showThankYou, setShowThankYou] = useState(false);
//   const [score, setScore] = useState(0);
//   const [remainingTime, setRemainingTime] = useState(10);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [userAnswered, setUserAnswered] = useState(false);
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [questions, setQuestions] = useState([]);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const [userAnswer, setUserAnswer] = useState("");

//   const quizId = window.location.pathname.split("/")[2];

//   useEffect(() => {
//     console.log(quizId);
//     axios
//       .get(`${BACKEND_URL}/quizzes/${quizId}`)
//       .then((response) => {
//         setData(response.data);
//       })

//       .catch((error) => {
//         console.error("API request failed", error);
//         setLoading(false);
//       });
//   }, []);
//   console.log(data);

//   useEffect(() => {
//     if (Object.keys(data).length === 0) return;
//     axios
//       .get(`${BACKEND_URL}/questions/${data.quizImpression._id}`)
//       .then((response) => {
//         setQuestions(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("API request failed", error);
//         setLoading(false);
//       });
//   }, [data]);
//   console.log(questions);

//   useEffect(() => {
//     let timerInterval;

//     if (
//       remainingTime > 0 &&
//       questions?.[currentQuestionIndex]?.timer !== null
//     ) {
//       timerInterval = setInterval(() => {
//         setRemainingTime(remainingTime - 1);
//       }, 1000);
//     } else {
//       clearInterval(timerInterval);
//       if (remainingTime === 0) {
//         handleNextQuestion();
//       }
//     }

//     return () => {
//       clearInterval(timerInterval);
//     };
//   }, [remainingTime]);

//   useEffect(() => {
//     if (showThankYou) {
//       if (userAnswers.length > 0) {
//         axios
//           .post(`${BACKEND_URL}/quizzes/check-answer`, {
//             chooseAnswers: userAnswers,
//             quizId,
//           })
//           .then((res) => {
//             setScore(res.data.score);
//           });
//       }
//     }
//   }, [showThankYou]);

//   const handleNextQuestion = async () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       if (showThankYou) {
//         setShowThankYou(false);
//       }
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setUserAnswers((prev) => {
//         return [...new Set([...prev, userAnswer])];
//       });
//       setSelectedOption(null);
//       setUserAnswered(false);
//       setRemainingTime(questions[currentQuestionIndex + 1].timer);
//     } else {
//       setShowThankYou(true);
//     }
//   };

//   if (loading || questions.length === 0) return null;
//   return (
//     <div className="q-quiz-container">
//       <div className="q-quiz-container1">
//         {showThankYou ? (
//           <ThankYouScreen
//             score={score}
//             totalQuestions={questions.length}
//             data={data}
//           />
//         ) : (
//           <div>
//             <div className="q-quiz-head">
//               <h1 className="quiz-num">
//                 {currentQuestionIndex + 1}/{questions.length}
//               </h1>
//               {questions[currentQuestionIndex].timer > 0 && (
//                 <h1 className="quiz-timer">{formatTime(remainingTime)}s</h1>
//               )}
//             </div>
//             <div className="quiz-question-wrap">
//               <h1 className="quiz-question">
//             {(questions[currentQuestionIndex].text)}
//               </h1>
//               <div className="quiz-option-cards">

//                 {questions[currentQuestionIndex].options.map(

//                   (option, index) => (

//                     <div className="quiz-option-card1">

//                       <div
//                         key={index}
//                         className={`quiz-option-card ${
//                           userAnswer.id === option._id &&
//                           "quiz-option-card-active"
//                         }`}
//                         onClick={() =>
//                           setUserAnswer({
//                             questionId: questions[currentQuestionIndex]._id,
//                             id: option._id,
//                           })
//                         }
//                       >
//                         <h1>hello {option} </h1>
//                         <div className="img-text">
//                           {option.optionText && <div>{option.optionText}</div>}
//                           {option.optionImage && (
//                             <img
//                               src={option.optionImage}
//                               alt={`Option ${index + 1}`}
//                               className="option-img"
//                             />
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//             <div className="quiz-next-btn">
//               <button onClick={handleNextQuestion}>
//                 {currentQuestionIndex === questions.length - 1
//                   ? "Submit"
//                   : "NEXT"}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function ThankYouScreen({ score, totalQuestions, data }) {
//   return data.type === "Poll" ? (
//     <div className="quiz-question-wrap">
//       <h1 className="poll-congrats-text">
//         Thank you for participating in the Poll
//       </h1>
//     </div>
//   ) : (
//     <div className="quiz-question-wrap">
//       <h1 className="quiz-congrats-text">Congrats Quiz is completed</h1>
//       <div className="quiz-trophy">
//         <img src="/trophy.png" alt="trophy" className="quiz-trophy-img" />
//       </div>
//       <div className="quiz-next-btn">
//         <h1 className="quiz-congrats-text">
//           Your Score is{" "}
//           <span style={{ color: "#60B84B" }}>
//             0{score}/0{totalQuestions}
//           </span>
//         </h1>
//       </div>
//     </div>
//   );
// }

// export default QuizScreen;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import "../../src/App.css";
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

const QuizScreen =()=> {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(10);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswered, setUserAnswered] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");

  const quizId = window.location.pathname.split("/")[2];

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/quizzes/${quizId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("API request failed", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(data).length === 0) return;
    axios
      .get(`${BACKEND_URL}/questions/${data.quizImpression._id}`)
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API request failed", error);
        setLoading(false);
      });
  }, [data]);

  useEffect(() => {
    let timerInterval;

    if (
      remainingTime > 0 &&
      questions?.[currentQuestionIndex]?.timer !== null
    ) {
      timerInterval = setInterval(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
      if (remainingTime === 0) {
        handleNextQuestion();
      }
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [remainingTime]);

  useEffect(() => {
    if (showThankYou) {
      if (userAnswers.length > 0) {
        axios
          .post(`${BACKEND_URL}/quizzes/check-answer`, {
            chooseAnswers: userAnswers,
            quizId,
          })
          .then((res) => {
            setScore(res.data.score);
          });
      }
    }
  }, [showThankYou]);

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      if (showThankYou) {
        setShowThankYou(false);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswers((prev) => {
        return [...new Set([...prev, userAnswer])];
      });
      setSelectedOption(null);
      setUserAnswered(false);
      setRemainingTime(questions[currentQuestionIndex + 1].timer);
    } else {
      setShowThankYou(true);
    }
  };

  if (loading || questions.length === 0) return null;

  return (
    <div className="q-quiz-container">
      <div className="q-quiz-container1">
        {showThankYou ? (
          <ThankYouScreen
            score={score}
            totalQuestions={questions.length}
            data={data}
          />
        ) : (
          <div>
            <div className="q-quiz-head">
              <h1 className="quiz-num">
                {currentQuestionIndex + 1}/{questions.length}
              </h1>
              {questions[currentQuestionIndex].timer > 0 && (
                <h1 className="quiz-timer">{formatTime(remainingTime)}s</h1>
              )}
            </div>

            <div className="quiz-question-wrap">
              <h1 className="quiz-question">
                {questions[currentQuestionIndex].text}
              </h1>
              <div className="quiz-option-cards">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <div className="quiz-option-card1" key={index}>
                      <div
                        className={`quiz-option-card ${
                          userAnswer &&
                          userAnswer.id === option._id &&
                          "quiz-option-card-active"
                        }`}
                        onClick={() => {
                          setUserAnswer({
                            questionId: questions[currentQuestionIndex]._id,
                            id: option._id,
                          });
                          setUserAnswered(true);
                        }}
                      >
                        <h1>hello {option.optionText} </h1>
                        <div className="img-text">
                          {option.optionText && <div>{option.optionText}</div>}
                          {option.optionImage && (
                            <img
                              src={option.optionImage}
                              alt={`Option ${index + 1}`}
                              className="option-img"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="quiz-next-btn">
              <button onClick={handleNextQuestion}>
                {currentQuestionIndex === questions.length - 1
                  ? "Submit"
                  : "NEXT"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ThankYouScreen({ score, totalQuestions, data }) {
  return data.type === "Poll" ? (
    <div className="quiz-question-wrap">
      <h1 className="poll-congrats-text">
        Thank you for participating in the Poll
      </h1>
    </div>
  ) : (
    <div className="quiz-question-wrap">
      <h1 className="quiz-congrats-text">Congrats Quiz is completed</h1>
      <div className="quiz-trophy">
        <img src="/trophy.png" alt="trophy" className="quiz-trophy-img" />
      </div>
      <div className="quiz-next-btn">
        <h1 className="quiz-congrats-text">
          Your Score is{" "}
          <span style={{ color: "#60B84B" }}>
            0{score}/0{totalQuestions}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default QuizScreen;

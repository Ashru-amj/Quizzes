import React, { useState, useEffect } from "react";

function PollScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswered, setUserAnswered] = useState(false);

  const dummyQuizData = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: [
        { text: "Blue Whale" },
        { text: "Elephant" },
        { text: "Giraffe" },
        { text: "Hippopotamus" },
      ],
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: [
        {
          image:
            "https://th.bing.com/th/id/OIP.bPBCgvp9N0SUbVYJnBg2IQHaEo?w=268&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
          image:
            "https://th.bing.com/th/id/OIP.wwxK07x0Umfnh0l-nrjxjgHaDg?w=337&h=166&c=7&r=0&o=5&pid=1.7",
        },
        {
          image:
            "https://th.bing.com/th/id/OIP.YAXlTjvtEKchdMVc5laZhwHaE8?w=260&h=180&c=7&r=0&o=5&pid=1.7",
        },
        {
          image:
            "https://th.bing.com/th/id/OIP.1YM53mG10H_U25iPjop83QHaEo?w=277&h=180&c=7&r=0&o=5&pid=1.7",
        },
      ],
    },
    {
      id: 3,
      question: "What is the largest mammal?",
      options: [
        { text: "Blue Whale" },
        { text: "Elephant" },
        { text: "Giraffe" },
        { text: "Hippopotamus" },
      ],
    },
    {
      id: 4,
      question: "Which gas do plants absorb from the atmosphere?",
      options: [
        {
          text: "Paris",
          image:
            "https://www.bing.com/images/search?q=images&FORM=IQFRBA&id=EECFBB7F4320921571A539DB459CACFE9D1EC242",
        },
        {
          text: "London",
          image:
            "https://www.bing.com/images/search?q=images&FORM=IQFRBA&id=BC6470C60B7A8615DA7155B539C4A122275DF649",
        },
        {
          image:
            "https://www.bing.com/images/search?q=images&FORM=IQFRBA&id=43824294513089F762FDBEFDDF38166278C4205D",
        },
        {
          image:
            "https://www.bing.com/images/search?q=images&FORM=IQFRBA&id=94B2C78BD26039EECFBD68752806A5A2DD8F293E",
        },
      ],
    },
  ];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < dummyQuizData.length - 1) {
      if (showThankYou) {
        setShowThankYou(false);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setUserAnswered(false);
    } else {
      setShowThankYou(true);
    }
  };

  const handleOptionClick = (option) => {
    if (!userAnswered) {
      if (option === dummyQuizData[currentQuestionIndex].options[0]) {
        setScore(score + 1);
      }
      setUserAnswered(true);
    }
  };

  return (
    <div className="q-quiz-container">
      <div className="q-quiz-container1">
        {showThankYou ? (
          <ThankYouScreen score={score} totalQuestions={dummyQuizData.length} />
        ) : (
          <div>
            <div className="q-quiz-head">
              <h1 className="quiz-num">
                {currentQuestionIndex + 1}/{dummyQuizData.length}
              </h1>
            </div>
            <div className="quiz-question-wrap">
              <h1 className="quiz-question">
                {dummyQuizData[currentQuestionIndex].question}
              </h1>
              <div className="quiz-option-cards">
                {dummyQuizData[currentQuestionIndex].options.map(
                  (option, index) => (
                    <div
                      key={index}
                      className={`quiz-option-card ${
                        selectedOption === (option.text || "") ? "selected" : ""
                      }`}
                      onClick={() => handleOptionClick(option.text || "")}
                    >
                      {option.image && (
                        <img src={option.image} alt={`Option ${index + 1}`} />
                      )}
                      {option.text && <div>{option.text}</div>}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="quiz-next-btn">
              <button onClick={handleNextQuestion}>
                {currentQuestionIndex === dummyQuizData.length - 1
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

function ThankYouScreen({ score, totalQuestions }) {
  return (
    <div className="quiz-question-wrap">
      <h1 className="poll-congrats-text">
        Thank you for participating in the Poll
      </h1>
    </div>
  );
}

export default PollScreen;

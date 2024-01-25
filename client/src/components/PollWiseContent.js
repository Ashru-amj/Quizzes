import React from "react";
import "../../src/App.css";
function PollWiseContent() {
  const quizData = [
    {
      title: "Quiz 2 Question Analysis",
      createdOn: "04 Sep, 2023",
      impressions: 667,
      questions: [
        {
          questionText: "Q.1 Question place holder for analysis?",
          options: [
            { text: "Option 1", count: 60 },
            { text: "Option 2", count: 23 },
            { text: "Option 3", count: 45 },
            { text: "Option 4", count: 11 },
          ],
        },
        {
          questionText: "Q.1 Question place holder for analysis?",
          options: [
            { text: "Option 1", count: 60 },
            { text: "Option 2", count: 23 },
            { text: "Option 3", count: 45 },
            { text: "Option 4", count: 11 },
          ],
        },
        {
          questionText: "Q.1 Question place holder for analysis?",
          options: [
            { text: "Option 1", count: 60 },
            { text: "Option 2", count: 23 },
            { text: "Option 3", count: 45 },
            { text: "Option 4", count: 11 },
          ],
        },
        {
          questionText: "Q.1 Question place holder for analysis?",
          options: [
            { text: "Option 1", count: 60 },
            { text: "Option 2", count: 23 },
            { text: "Option 3", count: 45 },
            { text: "Option 4", count: 11 },
          ],
        },
      ],
    },
  ];

  return (
    <div className="content">
      {quizData.map((quiz, index) => (
        <div className="q-title4-wrap" key={index}>
          <div className="q-title4">{quiz.title}</div>
          <div className="q-text4">
            Created on: {quiz.createdOn}
            <br />
            Impressions: {quiz.impressions}
          </div>
        </div>
      ))}
      <div className="q-questions-container">
        {quizData.map((quiz, quizIndex) => (
          <div key={quizIndex}>
            {quiz.questions.map((question, questionIndex) => (
              <>
                <div className="q-question1" key={questionIndex}>
                  {question.questionText}
                </div>
                <div className="q-question-cards1" key={questionIndex}>
                  {question.options.map((option, optionIndex) => (
                    <div className="q-question-card2" key={optionIndex}>
                      <span className="q-question-card-num">
                        {option.count}
                      </span>
                      <span className="q-question-card-text">
                        {option.text}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PollWiseContent;

import React from "react";
import QuestionWiseContent from "../components/QuestionWiseContent";
import PollWiseContent from "../components/PollWiseContent";
import MainLayout from "../components/MainLayout";


const QuizAnalytics=() =>{
  const type = window.location.search.split("type=")[1];
  // console.log(window.location.search.split("type="));
  return (
    <MainLayout>
      {type === "Q&A" ? <QuestionWiseContent/> : null}
      {type === "Poll" ? <PollWiseContent/> : null}
    </MainLayout>
  );
}

export default QuizAnalytics;

const express = require("express");
const router = express.Router();
const Question = require("../models/question.js");
const authenticateUser = require("../middleware/authMiddleware.js");
const Quiz = require("../models/quiz");


router.post("/questions", authenticateUser, async (req, res) => {
  try {
    // const { text, options, timer, quizId, selectedOption } = req.body;
    const { questions, quizId } = req.body;
    const userId = req.user._id;
   
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const { questionText, options, intervalTime, selectedOption } = question;
      
      await Question.create({
        text: questionText,
        options,
        timer: intervalTime,
        quizId,
        userId,
        selectedOption,
      });
    }

    res.status(201).json({ status: "question created" });
  } catch (error) {
    res.status(500).json({ error: "Question creation failed" });
  }

  router.put("/questions", authenticateUser, async (req, res) => {
    try {
      // const { text, options, timer, quizId, selectedOption } = req.body;
      const { questions, quizId } = req.body;
      const userId = req.user._id;
      
      await Question.deleteMany({ quizId });

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const { questionText, options, intervalTime, selectedOption } =
          question;
        await Question.create({
          text: questionText,
          options,
          timer: intervalTime,
          quizId,
          userId,
          selectedOption,
        });
      }

      res.status(201).json({ status: "question edited" });
    } catch (error) {
      res.status(500).json({ error: "Question edited failed" });
    }
  });
});

router.get("/questions/:quizId", async (req, res) => {
  try {
    const questions = await Question.find({ quizId: req.params.quizId });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});


router.post("/questions/:questionId/evaluate", async (req, res) => {
  const questionId = req.params.questionId;
  const { userAnswer } = req.body;
  

  try {
    const question = await Question.findById(questionId);
  
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
  
    const correctOption = question.options.find(
     (option)=> option.isCorrect && option.optionText === userAnswer  
    );
    
    if (correctOption) {
      // User's answer is correct
      res.status(200).json({ message: "Correct answer", score: 1 });
    } else {
      // User's answer is incorrect
      res.status(200).json({ message: "Incorrect answer", score: 0 });
    }
  } catch (error) {
    res.status(500).json({ error: "Evaluation failed" });
  }
  
});


// Add a new question to a quiz
router.get("/starts", authenticateUser, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ userId: req.user._id });
    const questions = await Question.find({ userId: req.user._id });
    const trendy = quizzes.filter((quiz) => {
      return quiz.impressionCount > 10;
    });
    let impression = 0;
    for (let i = 0; i < quizzes.length; i++) {
      impression += quizzes[i].impressionCount;
    }
    res.status(201).json({
      quizzes: quizzes.length,
      questions: questions.length,
      impression,
      trendy,
    });
  } catch (error) {
    res.status(500).json({ error: "Question creation failed" });
  }
});

module.exports = router;

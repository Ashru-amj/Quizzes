const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");
const Question = require("../models/question.js");
const authenticateUser = require("../middleware/authMiddleware");

// Create a new quiz
router.post("/quizzes", authenticateUser, async (req, res) => {
    try {
      const { title, type ,userId} = req.body;
    //   const userId = req.user._id;

  
      const quiz = new Quiz({ title, type, userId });
      //const shareLink = `http://localhost:3000/quiz/${quizId}`;
      await quiz.save();
      res.status(201).json(quiz);
    } catch (error) {
      res.status(500).json({ error: "Quiz creation failed" });
    }
  });   


  // Get all quizzes
router.get("/quizzes", authenticateUser, async (req, res) => {
    try {
      const quizzes = await Quiz.find({ userId: req.user._id });
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quizzes" });
    }
  });


 // Share a quiz by generating a unique link or code
router.get("/quizzes/:quizId/share", async (req, res) => {
    const quizId = req.params.quizId;
    try {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
  
      // Generate a unique link or code for sharing
      const shareLink = `http://localhost:3000/quiz/${quizId}`;
  
      res.status(200).json({ shareLink });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate share link" });
    }
  });

  // Track impressions for a quiz
router.get("/quizzes/:quizId", async (req, res) => {
    const quizId = req.params.quizId;
    try {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
  
      // Increment the impression count
      quiz.impressionCount = (quiz.impressionCount || 0) + 1;
      const quizImpression = await quiz.save();
  
      res
        .status(200)
        .json({ message: "Impression tracked successfully", quizImpression });
    } catch (error) {
      res.status(500).json({ error: "Failed to track impression" });
    }
  });

  router.get("/quizzes/read/:quizId", async (req, res) => {
    const quizId = req.params.quizId;
    try {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
  
      res.status(200).json(quiz);
    } catch (error) {
      res.status(500).json({ error: "Failed to track impression" });
    }
  });


  // checking for answers
router.post("/quizzes/check-answer", async (req, res) => {
    const { chooseAnswers, quizId } = req.body;
    const quiz = await Quiz.findById(quizId);
  
    let score = 0;
  
    for (const answer of chooseAnswers) {
      const question = await Question.findById(answer.questionId);
      if (!question) continue;
      const correctAnswer = question.options.find((opt) => opt.isCorrect);
      const correct = answer.id?.toString() === correctAnswer._id?.toString();
      const updateField = correct ? "correct" : "incorrect";
      await Question.findByIdAndUpdate(answer.questionId, {
        $inc: { [updateField]: 1, attempt: 1 },
      });
      if (correct) {
        score++;
      }
    }
  
    res.status(200).json({ status: true, score });
  });
  

  module.exports = router;
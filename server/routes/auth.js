const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateUser = require("../middleware/authMiddleware.js");

router.post("/users/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ userId: user._id }, "ashrumochana", {
          expiresIn: "10h",
        });
        res
          .status(201)
          .json({ message: "User registered successfully", user, token });
      }  catch (error) {
      res.status(500).json({ error: "Registration failed" });
    }
  });

  
router.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(401).json({ error: "Authentication failed" });
        }
    
        console.log(user);
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
          return res.status(401).json({ error: "Authentication failed" });
        }
        // Generate a JWT token and send it in the response
       const token = jwt.sign({ userId: user._id }, "ashrumochana", {
        expiresIn: "10h",
      });
       
        res.status(200).json({ message: "Authentication successful", token,user });
      } catch (error) {
        res.status(500).json({ error: "Login failed" });
      }
  });

  router.put("/users/:userId/profile", authenticateUser, async (req, res) => {
    try {
      const userId = req.params.userId;
      // Check if the user is the same as the one being updated
      if (userId !== req.user._id.toString()) {
        return res.status(403).json({ error: "Access denied" });
      }
      const { name} = req.body;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      user.name = name || user.name;
    //   user.email = email || user.email;
      await user.save();
  
      res.status(200).json({ message: "User profile updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Profile update failed" });
    }
  });

  module.exports = router;
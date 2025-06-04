const express = require("express");
const mongoose = require("mongoose");
const Problem = require("../models/Problem.js");
const TestCase = require("../models/TestCase.js");
const Solution = require("../models/Solution.js");
const cloudinary = require("../config/cloudinary");
const router = express.Router();


router.post("/seed", async (req, res) => {
  const { problems } = req.body; 

  if (!problems || !Array.isArray(problems)) {
    return res.status(400).json({ message: "Invalid request body. Provide an array of problems." });
  }

  try {
    const seededProblems = [];

    for (const problemData of problems) {
      const {
        title,
        description,
        category,
        difficulty,
        likes,
        dislikes,
        images,
        youtubeLink,
        testCases,
        solutions,
      } = problemData;

      const uploadedImages = [];
      if (images && Array.isArray(images)) {
        for (const image of images) {
          const result = await cloudinary.uploader.upload(image, {
            folder: "problems", 
          });
          uploadedImages.push(result.secure_url); 
        }
      }

      const problem = new Problem({
        title,
        description,
        category,
        difficulty,
        likes,
        dislikes,
        images,
        youtubeLink,
      });
      await problem.save();

      if (testCases && Array.isArray(testCases)) {
        for (const testCaseData of testCases) {
          const testCase = new TestCase({
            problemId: problem._id,
            ...testCaseData,
          });
          await testCase.save();
          problem.testCases.push(testCase._id);
        }
      }

      if (solutions && Array.isArray(solutions)) {
        for (const solutionData of solutions) {
          const solution = new Solution({
            problemId: problem._id,
            ...solutionData,
          });
          await solution.save();
          problem.solutions.push(solution._id);
        }
      }

      await problem.save();
      seededProblems.push(problem);
    }

    res.status(201).json({
      message: "Database seeded successfully.",
      seededProblems,
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ message: "Failed to seed database.", error: error.message });
  }
});

module.exports = router;

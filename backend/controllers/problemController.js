const Problem = require("../models/Problem");
const TestCase = require("../models/TestCase.js");
const Solution = require("../models/Solution.js");

exports.getProblem = async (req, res) => {
  try {
    const { problem_id } = req.params;

    console.log("Fetching problem with ID:", problem_id);
    const problem = await Problem.findById({_id: problem_id})
      .populate({
        path: "testCases", 
        model: "TestCase",
      })
      .populate({
        path: "solutions",
        model: "Solution",
      });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json({
      message: "Problem fetched successfully",
      problem,
    });
  } catch (err) {
    console.error("Error fetching problem:", err);

    res.status(500).json({
      message: "Error fetching problem",
      error: err.message,
    });
  }
};


exports.getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    console.log("problems");
    if (!problems) {
      return res.status(404).json({ message: "Problems not found" });
    }
    res
      .status(200)
      .json({ message: "Problems fetched successfully", problems });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error fetching problems", error: err.message });
  }
};

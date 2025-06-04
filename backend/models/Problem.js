const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: [String], 
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"], 
      default: "Easy"
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String], 
    },
    youtubeLink: {
      type: String
    },
    testCases: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestCase", 
      required: true,
    }],
    solutions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Solution", 
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", ProblemSchema);

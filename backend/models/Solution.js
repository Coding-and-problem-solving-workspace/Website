const mongoose = require("mongoose");

const SolutionSchema = mongoose.Schema(
  {
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },
    code: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Solution", SolutionSchema);

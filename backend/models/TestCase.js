const mongoose = require("mongoose");
const TestCaseSchema = new mongoose.Schema(
  {
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },
    expectedOutput: {
      type: String,
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("TestCase", TestCaseSchema);

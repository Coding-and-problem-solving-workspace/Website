const mongoose = require("mongoose");

const SubmissionSchema = mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },
    code: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        enum: ['FAILED', 'SUCCESS'],
        default: 'FAILED',
        required: true
    },
    language: {
        type: String,
        enum: ['Javascript', 'Python', 'Java', 'C++', "C"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", SubmissionSchema);

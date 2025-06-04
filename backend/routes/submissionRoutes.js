const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware.js");
const { createSubmission } = require("../controllers/submissionController.js");
const router = express.Router();
router.use(authenticateToken);
router.post("/", createSubmission);
module.exports = router;
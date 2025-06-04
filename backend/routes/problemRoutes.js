const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware.js");
const {getProblems, getProblem} = require("../controllers/problemController.js");
const router = express.Router();
router.use(authenticateToken);
router.get("/", getProblems);
router.get("/:problem_id", getProblem);
module.exports = router;
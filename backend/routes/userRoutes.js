const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware.js");
const { getDetails } = require("../controllers/userController.js");

const router = express.Router();
router.use(authenticateToken);
router.get("/", getDetails);
module.exports = router;
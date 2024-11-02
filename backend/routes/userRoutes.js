const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware.js");
const { getDetails, updateDetails } = require("../controllers/userController.js");
const upload = require("../config/multer.js");
const router = express.Router();
router.use(authenticateToken);
router.get("/", getDetails);
router.put("/update", upload.single("image"), updateDetails);
module.exports = router;
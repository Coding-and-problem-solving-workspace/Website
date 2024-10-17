const express = require("express");
const { signup } = require('../controllers/authController');
const upload = require("../config/multer");

const router = express.Router();

router.post('/signup', upload.single('image'), signup);

module.exports = router;
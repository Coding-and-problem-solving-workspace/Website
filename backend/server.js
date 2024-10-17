const express = require("express");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { connectDB } = require("./lib/db.js");
require("dotenv").config();

const app = express();
app.use(cors());

connectDB();
app.use(express.json());

const upload = multer({
  dest: path.join(__dirname, 'uploads/'), 
});

app.use('/api/v1/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
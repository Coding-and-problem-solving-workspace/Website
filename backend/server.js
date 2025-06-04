const express = require("express");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const problemRoutes = require("./routes/problemRoutes.js");
const dbSeedingRoute = require("./routes/dbSeedingRoute.js");
const submissionRoutes = require("./routes/submissionRoutes.js");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { connectDB } = require("./lib/db.js");
require("dotenv").config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});

connectDB();
app.use(express.json());

const upload = multer({
  dest: path.join(__dirname, 'uploads/'), 
});

app.use('/api/v1/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', dbSeedingRoute);
app.use('/api/v1/problems', problemRoutes);
app.use('/api/v1/submission', submissionRoutes);

app.set("socketio", io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
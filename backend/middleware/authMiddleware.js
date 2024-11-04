const admin = require("../config/firebase");

const authenticateToken = async (req, res, next) => {
  console.log(req.headers);
  console.log("body-->", req.body);
  const token = req.headers.authorization?.split(" ")[1].trim();
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = decodedToken;

    next();
  } catch (err) {
    console.log("Token verification failed: ", err.message);

    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  authenticateToken
};
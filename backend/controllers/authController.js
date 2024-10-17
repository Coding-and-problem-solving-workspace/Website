const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

//http://localhost:9000/api/v1/auth/signup
exports.signup = async (req, res) => {
  const { firstname, lastname, githubId, username, firebaseUid } = req.body;
  let image = null;
  console.log(firstname, lastname, githubId, image, username);
  const existingUser = await User.findOne({
    where: { firebaseUid: firebaseUid },
  });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result);
      image = result.secure_url;
    }
    console.log("inside try", firstname, lastname, githubId, image, username);
    const user = await User.create({
      firstname,
      lastname,
      githubId,
      username,
      image,
      firebaseUid,
    });
    console.log({ message: "signup successful", user });
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

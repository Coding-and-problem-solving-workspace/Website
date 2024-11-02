const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
exports.getDetails = async (req, res) => {
  try {
    const user = await User.findOne({
      firebaseUid: req.user.uid,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userDetails = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      image: user.image,
      githubId: user.githubId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.json({ user: userDetails });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching event", error: error.message });
  }
};

exports.updateDetails = async (req, res) => {
  console.log(req.body, req.user);
  try {
    const updates = {};
    if (!req.body) {
      return res.status(400).json({ message: "No request body" });
    }
    if (req.body.firstname !== undefined) {
      updates.firstname = req.body.firstname;
    }
    if (req.body.lastname !== undefined) {
      updates.lastname = req.body.lastname;
    }
    if (req.body.githubId !== undefined) {
      updates.githubId = req.body.githubId;
    }
    if (req.body.email !== undefined) {
      updates.email = req.body.email;
    }
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log("image", result);
      updates.image = result.secure_url; 
    }

    console.log("Received data:", updates);
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const result = await User.updateOne(
      { firebaseUid: req.user.uid },
      { $set: updates }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User details updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

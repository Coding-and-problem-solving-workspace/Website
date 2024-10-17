const User = require("../models/User");

exports.getDetails = async (req, res) => {
    // console.log(req);
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
      gituhbId: user.gituhbId,
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

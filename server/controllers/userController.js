const User = require("../models/User");

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      skillsOffered,
      skillsWanted,
      teachingMode,
      pricePerHour,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update fields
    if (skillsOffered) user.skillsOffered = skillsOffered;
    if (skillsWanted) user.skillsWanted = skillsWanted;
    if (teachingMode) user.teachingMode = teachingMode;
    if (pricePerHour) user.pricePerHour = pricePerHour;

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users (Explore page)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
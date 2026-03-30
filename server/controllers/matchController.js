const Match = require("../models/Match");
const User = require("../models/User");

// Send match request
exports.sendMatchRequest = async (req, res) => {
  try {
    const { userId } = req.body;

    if (userId === req.user.id)
      return res.status(400).json({ msg: "Cannot match yourself" });

    const existing = await Match.findOne({
      user1: req.user.id,
      user2: userId,
    });

    if (existing)
      return res.status(400).json({ msg: "Request already sent" });

    const match = await Match.create({
      user1: req.user.id,
      user2: userId,
    });

    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Accept / Reject match
exports.respondMatch = async (req, res) => {
  try {
    const { matchId, action } = req.body;

    const match = await Match.findById(matchId);

    if (!match)
      return res.status(404).json({ msg: "Match not found" });

    if (action === "accept") match.status = "accepted";
    if (action === "reject") match.status = "rejected";

    await match.save();

    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get my matches
exports.getMyMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      $or: [{ user1: req.user.id }, { user2: req.user.id }],
    })
      .populate("user1", "name email")
      .populate("user2", "name email");

    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Smart suggestions
exports.getSuggestions = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    const users = await User.find({
      _id: { $ne: req.user.id },
      skillsOffered: { $in: currentUser.skillsWanted },
    }).select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
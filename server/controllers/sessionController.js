const Session = require("../models/Session");
// Book session
// Book session
exports.bookSession = async (req, res) => {
  try {
    const { userId, mode, topic, date } = req.body;

    const session = await Session.create({
      users: [req.user.id, userId],
      mode,
      topic,
      date,
      paymentStatus: mode === "paid" ? "pending" : "success",
    });

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get my sessions
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      users: req.user.id,
    }).populate("users", "name email");

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update session status
exports.updateSessionStatus = async (req, res) => {
  try {
    const { sessionId, status } = req.body;

    const session = await Session.findById(sessionId);

    if (!session)
      return res.status(404).json({ msg: "Session not found" });

    session.status = status;

    await session.save();

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.mockPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await Session.findById(sessionId);

    if (!session)
      return res.status(404).json({ msg: "Session not found" });

    session.paymentStatus = "success";

    await session.save();

    res.json({ msg: "Payment successful (mock)", session });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
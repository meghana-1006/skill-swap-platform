const Chat = require("../models/Chat");

// Save message
exports.sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;

    const chat = await Chat.create({
      sender: req.user.id,
      receiver,
      message,
    });

    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get messages between two users
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Chat.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
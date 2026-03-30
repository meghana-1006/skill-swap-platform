const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  mode: {
    type: String,
    enum: ["swap", "paid", "free"],
  },
  topic: String,
  date: Date,
  paymentStatus: {
    type: String,
    enum: ["pending", "success"],
    default: "pending",
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);
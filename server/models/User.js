const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  skillsOffered: [String],
  skillsWanted: [String],
  teachingMode: [String], // swap, paid, free
  pricePerHour: Number,
  certificates: [
    {
      title: String,
      fileUrl: String,
      verified: {
        type: Boolean,
        default: false,
      },
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
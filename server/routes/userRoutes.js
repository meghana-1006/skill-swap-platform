const express = require("express");
const router = express.Router();
const {
  updateProfile,
  getAllUsers,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

// Update profile
router.put("/profile", auth, updateProfile);

// Get all users
router.get("/", getAllUsers);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  bookSession,
  getMySessions,
  updateSessionStatus,
  mockPayment,
} = require("../controllers/sessionController");

const auth = require("../middleware/authMiddleware");

// Book a session
router.post("/book", auth, bookSession);

// Get all sessions of logged-in user
router.get("/my", auth, getMySessions);

// Update session status (completed / cancelled)
router.post("/update", auth, updateSessionStatus);

// Mock payment (simulate payment success)
router.post("/mock-payment", auth, mockPayment);

module.exports = router;
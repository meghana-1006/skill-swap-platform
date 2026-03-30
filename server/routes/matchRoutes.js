const express = require("express");
const router = express.Router();
const {
  sendMatchRequest,
  respondMatch,
  getMyMatches,
  getSuggestions,
} = require("../controllers/matchController");
const auth = require("../middleware/authMiddleware");

router.post("/request", auth, sendMatchRequest);
router.post("/respond", auth, respondMatch);
router.get("/my", auth, getMyMatches);
router.get("/suggestions", auth, getSuggestions);

module.exports = router;
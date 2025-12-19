const express = require("express");
const router = require("express").Router();
const verifyToken = require("../middleware/verify-token");
const StudySession = require("../models/StudySession");
// GET /study-sessions
router.get("/", verifyToken, (req, res) => {
  res.json([]);
});

module.exports = router;

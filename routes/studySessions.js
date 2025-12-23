const express = require("express");
const router = require("express").Router();
const verifyToken = require("../middleware/verify-token");
const studysession = require("../models/StudySession");
const studyCtrl = require("../controllers/studySession");

router.get("/", verifyToken, studyCtrl.index);
router.post("/", verifyToken, studyCtrl.create);
router.delete("/:id", verifyToken, studyCtrl.destroy);

module.exports = router;

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Task = require("../models/studySession");
const router = require('./auth');
const User = require('../models/user');

async function index(req, res) {
  try {
    const sessions = await StudySession.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(sessions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to fetch study sessions" });
  }
}


async function create(req, res) {
  try {
    const { startTime, endTime, note } = req.body;

    if (!startTime || !endTime) {
      return res.status(400).json({
        err: "startTime and endTime are required",
      });
    }

    const durationMinutes =
      (new Date(endTime) - new Date(startTime)) / 60000;

    const session = await StudySession.create({
      userId: req.user._id,
      startTime,
      endTime,
      durationMinutes,
      status: "completed",
      note: note || "",
    });

    res.status(201).json(session);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to create study session" });
  }
}

async function destroy(req, res) {
  try {
    const deleted = await StudySession.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ err: "Study session not found" });
    }

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to delete study session" });
  }
}

module.exports = { index, create, destroy };
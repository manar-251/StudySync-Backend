const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('./auth');
const User = require('../models/user');
const WellnessLog = require("../models/WellnessLog");

async function index(req, res) {
  try {
    const logs = await WellnessLog.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to fetch wellness logs" });
  }
}
async function upsert(req, res) {
  try {
    const { date, waterGlasses, exerciseMinutes, sleepHours } = req.body;

    if (!date) return res.status(400).json({ err: "date is required" });

    const d = new Date(date);
    if (isNaN(d.getTime())) return res.status(400).json({ err: "Invalid date format" });

    const updated = await WellnessLog.findOneAndUpdate(
      { userId: req.user._id, date: d },
      {
        $set: {
          waterGlasses: Number(waterGlasses ?? 0),
          exerciseMinutes: Number(exerciseMinutes ?? 0),
          sleepHours: Number(sleepHours ?? 0),
        },
      },
      { new: true, upsert: true }
    );
     res.status(201).json(updated);
  } catch (err) {
    console.log(err);
     if (err.code === 11000) return res.status(409).json({ err: "Log already exists for this date" });
    res.status(500).json({ err: "Failed to save wellness log" });
  }
}

async function destroy(req, res) {
  try {
    const deleted = await WellnessLog.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) return res.status(404).json({ err: "Wellness log not found" });

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to delete wellness log" });
  }
}

module.exports = { index, upsert, destroy };


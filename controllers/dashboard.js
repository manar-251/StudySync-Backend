const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Task = require("../models/Task");
const StudySession = require("../models/StudySession");
const WellnessLog = require("../models/WellnessLog");


async function getSummary(req, res) {
  try {
    const userId = req.user._id;
    const tasksTotal = await Task.countDocuments({ userId });
    const tasksDone = await Task.countDocuments({ userId, completed: true });

    const sessions = await StudySession.find({ userId }, { durationMinutes: 1 });
    const studyMinutes = sessions.reduce(
      (sum, s) => sum + (s.durationMinutes || 0),
      0
    );

const latestWellness = await WellnessLog.findOne({ userId }).sort({ date: -1 });

    res.json({
      tasks: { total: tasksTotal, completed: tasksDone },
      study: { totalMinutes: studyMinutes, totalHours: +(studyMinutes / 60).toFixed(2) },
      wellness: latestWellness
        ? {
            date: latestWellness.date,
            waterGlasses: latestWellness.waterGlasses,
            exerciseMinutes: latestWellness.exerciseMinutes,
            sleepHours: latestWellness.sleepHours,
          }
        : null,
    });
    } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ err: err.message });
  }
}

module.exports = { getSummary };
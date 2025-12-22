const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Task = require("../models/Task");
const router = require('./auth');
const User = require('../models/user');


async function index(req, res) {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong!" });
  }
}

async function create(req, res) {
  try {
    const { title, priority = "medium", dueDate = "" } = req.body;
    if (!title) return res.status(400).json({ err: "title is required" });

    const task = await Task.create({
      title,
      priority,
      dueDate,
      completed: false,
      userId: req.user._id,
    });

        res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong!" });
  }
}

async function update(req, res) {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ err: "Task not found" });
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong!" });
  }
}

async function destroy(req, res) {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deleted) return res.status(404).json({ err: "Task not found" });
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong!"});
    }
}
    
module.exports = { index, create, update, destroy };

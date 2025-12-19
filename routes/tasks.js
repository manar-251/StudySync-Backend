const express = require("express");
const router = require("express").Router();
const Task = require("../models/Task");
const verifyToken = require("../middleware/verify-token");

// GET /tasks
router.get("/", verifyToken, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(tasks);
});

// POST /tasks
router.post("/", verifyToken, async (req, res) => {
  const { title, dueDate = "", priority = "medium" } = req.body;
  if (!title) return res.status(400).json({ message: "title required" });

  const task = await Task.create({
    title,
    dueDate,
    priority,
    completed: false,
    userId: req.user.id,
  });
  res.status(201).json(task);
});

// PUT /tasks/:id
router.put("/:id", verifyToken, async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
});

// DELETE /tasks/:id
router.delete("/:id", verifyToken, async (req, res) => {
  const deleted = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ ok: true });
});

module.exports = router;

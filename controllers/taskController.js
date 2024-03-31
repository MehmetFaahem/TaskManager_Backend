const Task = require("../models/task");
const { validationResult } = require("express-validator");

const createTask = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const task = new Task({
      userId,
      title,
      description,
    });

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getAllTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const { startIndex, endIndex } = req.pagination;
    const tasks = await Task.find({ userId })
      .skip(startIndex)
      .limit(endIndex - startIndex);
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getTaskById = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.taskId;

  try {
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.taskId;
  const { title, description, completed } = req.body;

  try {
    let task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    task.title = title;
    task.description = description;
    task.completed = completed;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.taskId;

  try {
    let task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    await task.remove();
    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};

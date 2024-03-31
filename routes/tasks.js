const express = require("express");
const router = express.Router();
const task = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");
const paginate = require("../middleware/paginationMiddleware");
const { check } = require("express-validator");

// Routes
router.post(
  "/",
  authMiddleware,
  [check("title", "Title is required").not().isEmpty()],
  validate,
  function (req, res) {
    task.createTask(req, res);
  }
);

router.get("/", authMiddleware, paginate, function (req, res) {
  task.getAllTasks(req, res);
});

router.get("/:taskId", authMiddleware, function (req, res) {
  task.getTaskById(req, res);
});

router.put(
  "/:taskId",
  authMiddleware,
  [check("title", "Title is required").not().isEmpty()],
  validate,
  function (req, res) {
    task.updateTask(req, res);
  }
);

router.delete("/:taskId", authMiddleware, function (req, res) {
  task.deleteTask(req, res);
});

module.exports = router;

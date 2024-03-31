const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");
const validate = require("../middleware/validationMiddleware");
const { check } = require("express-validator");

// Routes
router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  validate,
  function (req, res) {
    user.register(req, res);
  }
);

router.post(
  "/login",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  validate,
  function (req, res) {
    user.login(req, res);
  }
);

module.exports = router;

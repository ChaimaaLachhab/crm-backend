const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Test route
router.get("/", (req, res) => {
  res.send("Welcome to the auth API");
});

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

module.exports = router;

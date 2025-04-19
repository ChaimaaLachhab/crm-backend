const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const auth = require("../middleware/auth");
const permit = require("../middleware/role");
// Test route
router.get("/", (req, res) => {
  res.send("Welcome to the auth API");
});

// Register
router.post("/register",auth, permit("employer"), authController.register);

// Login
router.post("/login", authController.login);

// Get Me
router.get("/me", auth, authController.getMe);

// Update Me
router.put("/update", auth, authController.updateMe);

// Change Password
router.put("/change-password", auth, authController.changePassword);

module.exports = router;

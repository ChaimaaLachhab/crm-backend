const express = require("express");
const router = express.Router();
const managerController = require("../controllers/manager.controller");
const auth = require("../middleware/auth");
const permit = require("../middleware/role");

router.get("/", managerController.welcome);

router.get("/leads", auth, permit("manager"), managerController.getLeads);

router.patch("/leads/:id", auth, permit("manager"), managerController.updateLead);

module.exports = router;
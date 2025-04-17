const express = require("express");
const router = express.Router();
const managerController = require("../controllers/manager.controller");

router.get("/", managerController.welcome);

router.get("/leads", managerController.getLeads);

router.patch("/leads/:id", managerController.updateLead);

module.exports = router;
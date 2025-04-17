const express = require("express");
const router = express.Router();
const employerController = require("../controllers/employer.controller");
const auth = require("../middleware/auth");
const permit = require("../middleware/role");

router.get("/", employerController.welcome);

// Dashboard route
router.get("/dashboard-stats", auth, permit("employer"), employerController.getStatistics);

// Managers routes
router.get("/managers", auth, permit("employer"), employerController.getManagers);

router.post("/managers", auth, permit("employer"), employerController.createManager);

router.put("/managers/:managerId", auth, permit("employer"), employerController.updateManager);

router.delete("/managers/:managerId", auth, permit("employer"), employerController.deleteManager);

// Leads routes
router.get("/leads", auth, permit("employer"), employerController.getLeads);

router.post("/leads", auth, permit("employer"), employerController.createLead);

router.put("/leads/:leadId", auth, permit("employer"), employerController.updateLead);

router.delete("/leads/:leadId", auth, permit("employer"), employerController.deleteLead);

module.exports = router;

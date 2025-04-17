const express = require("express");
const router = express.Router();
const employerController = require("../controllers/employer.controller");


router.get("/", employerController.welcome);

// Managers routes
router.get("/managers", employerController.getManagers);

router.post("/managers", employerController.createManager);

router.put("/managers/:managerId", employerController.updateManager);

router.delete("/managers/:managerId", employerController.deleteManager);

// Leads routes
router.get("/leads", employerController.getLeads);

router.post("/leads", employerController.createLead);

router.put("/leads/:leadId", employerController.updateLead);

router.delete("/leads/:leadId", employerController.deleteLead);

module.exports = router;

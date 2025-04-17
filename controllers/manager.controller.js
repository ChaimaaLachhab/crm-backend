const User = require("../models/user.model");
const Lead = require("../models/lead.model");

// GET /
exports.welcome = (req, res) => {
    res.send("Welcome to the manager API")
};

// GTE /leads
exports.getLeads = async (req, res) => {};

// PATCH /leads/:leadId
exports.updateLead = async (req, res) => {};

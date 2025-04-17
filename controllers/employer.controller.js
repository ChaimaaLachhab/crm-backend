const User = require("../models/user.model");
const Lead = require("../models/lead.model");
// GET /
exports.welcome = (req, res) => {
    res.send("Welcome to the employer API")
};

// Managers
exports.getManagers = async (req, res) => {};

exports.createManager = async (req, res) => {};
exports.updateManager = async (req, res) => {};
exports.deleteManager = async (req, res) => {};

// Leads
exports.getLeads = async (req, res) => {};
exports.createLead = async (req, res) => {};
exports.updateLead = async (req, res) => {};
exports.deleteLead = async (req, res) => {};


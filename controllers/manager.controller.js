const User = require("../models/user.model");
const Lead = require("../models/lead.model");

// GET /
exports.welcome = (req, res) => {
  res.send("Welcome to the manager API");
};

// GTE /leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ managerId: req.user.id });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// PATCH /leads/:leadId
exports.updateLead = async (req, res) => {
  const { status, notes } = req.body;
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      managerId: req.user.id,
    });
    if (!lead)
      return res.status(403).json({ message: "Access denied to this lead" });

    if (status) lead.status = status;
    if (notes) lead.notes = Array.isArray(notes) ? notes : [notes];

    await lead.save();
    res.json({ message: "Lead updated by manager" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

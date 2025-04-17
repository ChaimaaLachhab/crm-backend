const User = require("../models/user.model");
const Lead = require("../models/lead.model");
const bcrypt = require('bcryptjs');

// GET /
exports.welcome = (req, res) => {
  res.send("Welcome to the employer API");
};

// Dashboard
exports.getStatistics = async (req, res) => {
    try {
      const employerId = req.user.id;
  
      const [inProgress, completed, canceled] = await Promise.all([
        Lead.countDocuments({ status: "IN_PROGRESS", createdBy: employerId }),
        Lead.countDocuments({ status: "COMPLETED", createdBy: employerId }),
        Lead.countDocuments({ status: "CANCELED", createdBy: employerId }),
      ]);
  
      res.status(200).json({
        IN_PROGRESS: inProgress,
        COMPLETED: completed,
        CANCELED: canceled,
      });
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

// Managers
exports.getManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: "manager" });
    res.json(managers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createManager = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    
    if (existingUser)
      return res.status(400).json({ message: "Manager already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const manager = new User({
      name,
      email,
      password: hashedPassword,
      role: "manager"
    });
    await manager.save();

    res.status(201).json({ message: "Manager created successfully" });
  } catch (error) {
    console.error("Error creating manager:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateManager = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.params.managerId, {
      name: name,
      email,
      password: hashedPassword,
    });
    res.json({ message: "Manager updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteManager = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.managerId);
    res.json({ message: "Manager deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Leads
exports.getLeads = async (req, res) => {
  const { managerId, status } = req.query;
  const filter = {};
  if (managerId) filter.managerId = managerId;
  if (status) filter.status = status;

  try {
    const leads = await Lead.find(filter);
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createLead = async (req, res) => {
  const {
    contactName,
    contactEmail,
    companyName,
    status = "PENDING",
    managerId,
  } = req.body;
  try {
    const newLead = new Lead({
      contactName,
      contactEmail,
      companyName,
      status,
      managerId,
    });
    await newLead.save();
    res.status(201).json({ message: "Lead created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateLead = async (req, res) => {
  const { contactName, contactEmail, companyName, status, managerId } =
    req.body;
  try {
    await Lead.findByIdAndUpdate(req.params.leadId, {
      contactName,
      contactEmail,
      companyName,
      status,
      managerId,
    });
    res.json({ message: "Lead updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.leadId);
    res.json({ message: "Lead deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

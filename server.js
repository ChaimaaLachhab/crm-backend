const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const employerRoutes = require('./routes/employer.routes');
const managerRoutes = require('./routes/manager.routes');
const authRoutes = require('./routes/auth.routes');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/api/employer', employerRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB
connectDB();

// Start the server 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware    
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('Sorry, that route does not exist.');
});

// Graceful shutdown
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed. Server shutting down...');
        process.exit(0);
    });
});

// Export the app
module.exports = app;
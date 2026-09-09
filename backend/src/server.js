const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows parsing of incoming JSON requests


// Sample Test Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'Backend server is running smoothly' });
});

// Start listening
app.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}`);
});
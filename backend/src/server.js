const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json()); // Allows parsing of incoming JSON requests

app.get('/api/message', (req, res) => {
    res.status(200).json({ message: 'Hello from the backend!' });
});

// Sample Test Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'Backend server is running smoothly' });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start listening
app.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}`);
});
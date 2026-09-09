const express = require('express');
const cors = require('cors');
const config = require('./config');
const systemRoutes = require('./routes/systemRoutes');
const dummyjsonRoutes = require('./routes/dummyjsonRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

// Initialize Express application
const app = express();

// Middleware setup
app.use(cors({origin: config.corsOrigin}));
app.use(express.json()); // Allows parsing of incoming JSON requests

// Routes
app.use('/api', systemRoutes);
app.use('/api/dummyjson', dummyjsonRoutes);

// Root route for basic backend status check
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Backend is running!' });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start the server
app.listen(config.port, () => {
    console.log(`Server successfully started on port ${config.port}`);
});
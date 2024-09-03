// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const dynamicResourceRoutes = require('./routes/dynamicResourceRoutes');
// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api', require('./routes/dynamicRoutes'));

app.use(dynamicResourceRoutes); // Ensure '/api' is the base route



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

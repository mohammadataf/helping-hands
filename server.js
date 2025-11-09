const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./routes/api.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500',   
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', apiRoutes);

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));
app.get('/contacts', (req, res) => res.sendFile(path.join(__dirname, 'views/contacts.html')));
app.get('/lostfound', (req, res) => res.sendFile(path.join(__dirname, 'views/lostfound.html')));
app.get('/roommate', (req, res) => res.sendFile(path.join(__dirname, 'views/roommate.html')));
app.get('/exchange', (req, res) => res.sendFile(path.join(__dirname, 'views/exchange.html')));

 

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error('MongoDB connection failed:', err));


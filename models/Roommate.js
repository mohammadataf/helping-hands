const mongoose = require('mongoose');

const RoommateSchema = new mongoose.Schema({
  name: String,
  year: String,
  branch: String,
  preferences: String,
  contact: String,
  time: String
}, { timestamps: true });

module.exports = mongoose.model('Roommate', RoommateSchema);
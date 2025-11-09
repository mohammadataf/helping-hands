const mongoose = require('mongoose');

const LostFoundSchema = new mongoose.Schema({
  type: String,
  name: String,
  description: String,
  contact: String,
  time: String
}, { timestamps: true });

module.exports = mongoose.model('LostFound', LostFoundSchema)
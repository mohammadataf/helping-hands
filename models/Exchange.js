const mongoose = require('mongoose');

const ExchangeSchema = new mongoose.Schema({
  name: String,
  type: String,
  item: String,
  description: String,
  contact: String,
  time: String
}, { timestamps: true });

module.exports = mongoose.model('Exchange', ExchangeSchema);
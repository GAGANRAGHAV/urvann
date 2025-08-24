const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categories: { type: [String], default: [] },
  price: { type: Number, default: 0 },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;

// importing mongoose module
const mongoose = require('mongoose');

// creating review schema
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true,
});

// exporting review schema
module.exports = mongoose.model('Review', reviewSchema);
// importing mongoose module
const mongoose = require('mongoose');

// creating user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  to: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  from: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    }
  ]

}, {
  timestamps: true,
});

// exporting user schema
module.exports = mongoose.model('User', userSchema);
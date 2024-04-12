const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: { // New password field
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  skill: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  time_slot: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  work_experience: {
    type: String,
    required: true
  },
  minimum_salary: {
    type: Number,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

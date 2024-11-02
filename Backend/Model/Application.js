const mongoose = require('mongoose');

// Define the Application schema
const ApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Accepted', 'Rejected'],
    default: 'Applied',
  }
});

// Create the Application model
const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;

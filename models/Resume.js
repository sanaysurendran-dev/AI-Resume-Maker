const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  startDate: String,
  endDate: String,
  yearsExperience: Number,
  description: String,
  bullets: [String],
  degree: String,
  school: String,
  field: String,
  grade: String,
  link: String,
  name: String,
}, { _id: false });

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    default: 'My Resume',
  },
  template: {
    type: String,
    enum: ['modern', 'professional', 'executive', 'minimal', 'ats-friendly', 'creative'],
    default: 'modern',
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    website: String,
    linkedin: String,
    github: String,
    summary: String,
  },
  skills: [String],
  education: [sectionSchema],
  experience: [sectionSchema],
  projects: [sectionSchema],
  certifications: [String],
  achievements: [String],
  atsAnalysis: {
    score: Number,
    matchingKeywords: [String],
    missingKeywords: [String],
    suggestions: [String],
    jobDescription: String,
    analyzedAt: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);

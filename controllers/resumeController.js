const Resume = require('../models/Resume');
const { analyzeResumeAgainstJob } = require('../utils/atsAnalyzer');

const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json({ resumes });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Could not fetch resumes' });
  }
};

const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({ resume });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Could not create resume' });
  }
};

const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const updated = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ resume: updated });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Could not update resume' });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    await Resume.deleteOne({ _id: req.params.id });
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Could not delete resume' });
  }
};

const analyzeResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const { jobDescription } = req.body;
    const analysis = analyzeResumeAgainstJob(resume.toObject(), jobDescription || '');

    resume.atsAnalysis = {
      ...analysis,
      jobDescription: jobDescription || '',
      analyzedAt: new Date(),
    };

    await resume.save();

    res.json({ analysis: resume.atsAnalysis });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Could not analyze resume' });
  }
};

module.exports = {
  getResumes,
  createResume,
  updateResume,
  deleteResume,
  analyzeResume,
};

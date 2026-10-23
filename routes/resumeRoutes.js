const express = require('express');
const {
  getResumes,
  createResume,
  updateResume,
  deleteResume,
  analyzeResume,
} = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getResumes).post(protect, createResume);
router.route('/:id').put(protect, updateResume).delete(protect, deleteResume);
router.post('/:id/analyze', protect, analyzeResume);

module.exports = router;

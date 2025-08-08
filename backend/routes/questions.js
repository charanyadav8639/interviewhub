const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Question = require('../models/question');

// Create question
router.post('/', auth, async (req, res) => {
  const { title, description, company, tags } = req.body;
  try {
    const q = new Question({ title, description, company, tags, author: req.user.id });
    await q.save();
    res.json(q);
  } catch (err) { res.status(500).send('Server error'); }
});

// Get questions (with simple search)
router.get('/', async (req, res) => {
  const { q, tag, company } = req.query;
  const filter = {};
  if (q) filter.$or = [ { title: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') } ];
  if (tag) filter.tags = tag;
  if (company) filter.company = company;
  const questions = await Question.find(filter).sort({ createdAt: -1 }).populate('author', 'name');
  res.json(questions);
});

// Get single
router.get('/:id', async (req, res) => {
  const question = await Question.findById(req.params.id).populate('author', 'name');
  if (!question) return res.status(404).json({ msg: 'Not found' });
  res.json(question);
});

module.exports = router;
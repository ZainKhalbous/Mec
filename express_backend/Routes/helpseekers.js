// routes/helpseekers.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// GET all helpseekers
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM HelpSeekers');
  res.json(rows);
});

// CREATE helpseeker
router.post('/', async (req, res) => {
  const { UserId, EmergencyContact, SpecialNeeds, FamilySize } = req.body;
  const [result] = await db.query(
    'INSERT INTO HelpSeekers (UserId, EmergencyContact, SpecialNeeds, FamilySize) VALUES (?, ?, ?, ?)',
    [UserId, EmergencyContact, SpecialNeeds, FamilySize]
  );
  res.status(201).json({ HelpSeekerId: result.insertId });
});

// Similar GET by ID, UPDATE, DELETE can be added as above
module.exports = router;

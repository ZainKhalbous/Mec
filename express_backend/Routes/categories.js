// routes/categories.js
const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Category');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { Name, Description } = req.body;
  const [result] = await db.query(
    'INSERT INTO Categories (Name, Description) VALUES (?, ?)',
    [Name, Description]
  );
  res.status(201).json({ CategoryId: result.insertId });
});

module.exports = router;

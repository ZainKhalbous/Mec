// routes/users.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Users');
  res.json(rows);
});

// GET user by ID
router.get('/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Users WHERE UserId = ?', [req.params.id]);
  res.json(rows[0]);
});

// CREATE user
router.post('/', async (req, res) => {
  const { ProfilePic, Name, Email, Password, Location, PhoneNumber, UserType } = req.body;
  const [result] = await db.query(
    'INSERT INTO Users (ProfilePic, Name, Email, Password, Location, PhoneNumber, UserType) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [ProfilePic, Name, Email, Password, Location, PhoneNumber, UserType]
  );
  res.status(201).json({ UserId: result.insertId });
});

// UPDATE user
router.put('/:id', async (req, res) => {
  const { ProfilePic, Name, Email, Password, Location, PhoneNumber, UserType } = req.body;
  await db.query(
    'UPDATE Users SET ProfilePic=?, Name=?, Email=?, Password=?, Location=?, PhoneNumber=?, UserType=? WHERE UserId=?',
    [ProfilePic, Name, Email, Password, Location, PhoneNumber, UserType, req.params.id]
  );
  res.sendStatus(200);
});

// DELETE user
router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM Users WHERE UserId=?', [req.params.id]);
  res.sendStatus(200);
});

module.exports = router;

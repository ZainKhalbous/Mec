// routes/donors.js
const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Donors');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { UserId, ProofOfIdentification, OrganizationName, DonorType, IsVerified, TotalDonations } = req.body;
  const [result] = await db.query(
    'INSERT INTO Donors (UserId, ProofOfIdentification, OrganizationName, DonorType, IsVerified, TotalDonations) VALUES (?, ?, ?, ?, ?, ?)',
    [UserId, ProofOfIdentification, OrganizationName, DonorType, IsVerified, TotalDonations]
  );
  res.status(201).json({ DonorId: result.insertId });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db'); // your MySQL connection

// --- CREATE a new request ---
router.post('/', async (req, res) => {
  try {
    const {
      HelpSeekerId,
      CategoryId,
      Description,
      QuantityNeeded,
      Unit,
      UrgencyLevel,
      Status,
      Location,
      Deadline
    } = req.body;

    if (!HelpSeekerId || !CategoryId || !Title || !QuantityNeeded || !Unit) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const [result] = await db.query(
      `INSERT INTO Requests 
      (HelpSeekerId, CategoryId, Title, Description, QuantityNeeded, Unit, UrgencyLevel, Status, Location, Deadline) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [HelpSeekerId, CategoryId, Title, Description, QuantityNeeded, Unit, UrgencyLevel || 'medium', Status || 'pending', Location, Deadline]
    );

    const [newRequest] = await db.query('SELECT * FROM Requests WHERE RequestId = ?', [result.insertId]);
    res.status(201).json(newRequest[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// --- READ all requests ---
router.get('/', async (req, res) => {
  try {
    const [requests] = await db.query('SELECT * FROM Requests');
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// --- READ one request by ID ---
router.get('/:id', async (req, res) => {
  try {
    const [request] = await db.query('SELECT * FROM Requests WHERE RequestId = ?', [req.params.id]);
    if (request.length === 0) return res.status(404).json({ message: 'Request not found' });
    res.json(request[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// --- UPDATE a request ---
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body; // can include Unit and other fields
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) return res.status(400).json({ message: 'No fields to update' });

    const setString = fields.map(field => `${field} = ?`).join(', ');

    await db.query(`UPDATE Requests SET ${setString} WHERE RequestId = ?`, [...values, req.params.id]);

    const [updatedRequest] = await db.query('SELECT * FROM Requests WHERE RequestId = ?', [req.params.id]);
    res.json(updatedRequest[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// --- DELETE a request ---
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM Requests WHERE RequestId = ?', [req.params.id]);
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

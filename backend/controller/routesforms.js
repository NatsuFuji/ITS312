const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

// Database connection setup
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "your_database_name",
};

let connection;
(async () => {
  connection = await mysql.createConnection(dbConfig);
})();

// Routes

// 1. Get all event requests
router.get("/event-requests", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM EventRequests");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Get a specific event request by ID
router.get("/event-requests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await connection.execute("SELECT * FROM EventRequests WHERE id = ?", [id]);
    if (rows.length === 0) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Create a new event request
router.post("/event-requests", async (req, res) => {
  try {
    const {
      Address,
      purpose,
      facility,
      booking,
      requestedBy,
      approvedBy,
      dateFiled,
      dateEvent,
      startTime,
      endTime,
      notedBy,
      dateAccomplished,
      receivedBy,
    } = req.body;

    const [result] = await connection.execute(
      `INSERT INTO EventRequests 
       (Address, purpose, facility, booking, requestedBy, approvedBy, dateFiled, dateEvent, startTime, endTime, notedBy, dateAccomplished, receivedBy) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Address,
        purpose,
        facility,
        booking,
        requestedBy,
        approvedBy,
        dateFiled,
        dateEvent,
        startTime,
        endTime,
        notedBy,
        dateAccomplished,
        receivedBy,
      ]
    );

    res.status(201).json({ message: "Event request created", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Update an existing event request
router.put("/event-requests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Address,
      purpose,
      facility,
      booking,
      requestedBy,
      approvedBy,
      dateFiled,
      dateEvent,
      startTime,
      endTime,
      notedBy,
      dateAccomplished,
      receivedBy,
    } = req.body;

    const [result] = await connection.execute(
      `UPDATE EventRequests 
       SET Address = ?, purpose = ?, facility = ?, booking = ?, requestedBy = ?, approvedBy = ?, dateFiled = ?, dateEvent = ?, startTime = ?, endTime = ?, notedBy = ?, dateAccomplished = ?, receivedBy = ?
       WHERE id = ?`,
      [
        Address,
        purpose,
        facility,
        booking,
        requestedBy,
        approvedBy,
        dateFiled,
        dateEvent,
        startTime,
        endTime,
        notedBy,
        dateAccomplished,
        receivedBy,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.status(200).json({ message: "Event request updated" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Delete an event request
router.delete("/event-requests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await connection.execute("DELETE FROM EventRequests WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.status(200).json({ message: "Event request deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

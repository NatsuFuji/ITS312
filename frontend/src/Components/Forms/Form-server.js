const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Set up middleware
app.use(cors());
app.use(bodyParser.json());

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Your MySQL username
  password: '',  // Your MySQL password
  database: 'db_request', // Your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// POST route to handle form submission
app.post('/forms', (req, res) => {
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
    dateAccomplished,
    receivedBy,
  } = req.body;
  

  // SQL query to insert data into 'events' table
  const query = `
  INSERT INTO events (Address, purpose, facility, booking, requestedBy, approvedBy, dateFiled, dateEvent, startTime, endTime, dateAccomplished, receivedBy)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
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
      dateAccomplished,
      receivedBy,
    ],
    (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Failed to insert data into the database' });
      }
      return res.status(200).json({ message: 'Data successfully inserted into the database' });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

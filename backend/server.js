const express = require('express')
const cors = require("cors")


const app = express()
const port = 3000

// databse connection
const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_request'
})

db.connect()

// middlewaare
app.use(cors())
app.use(express.json())

app.post("/event/add", (req, res) => {
  const { Address, purpose, facility, booking, requestedBy, approvedBy, dateFiled, dateEvent, startTime, endTime, dateAccomplished, receivedBy } = req.body

  const formattedDateFiled = new Date(dateFiled).toISOString().slice(0, 10); // YYYY-MM-DD
  const formattedDateEvent = new Date(dateEvent).toISOString().slice(0, 10); // YYYY-MM-DD
  const formattedDateAccomplished = new Date(dateAccomplished).toISOString().slice(0, 10); // YYYY-MM-DD
  const formattedStartTime = new Date(`1970-01-01T${startTime}`).toISOString().slice(11, 19); // HH:MM:SS
  const formattedEndTime = new Date(`1970-01-01T${endTime}`).toISOString().slice(11, 19); // HH:MM:SS

  db.query(`INSERT INTO events(Address, purpose, facility, booking, requestedBy, approvedBy, dateFiled, dateEvent, startTime, endTime, dateAccomplished, receivedBy)
            VALUES("${Address}", "${purpose}", "${facility}", "${booking}", "${requestedBy}", "${approvedBy}", "${formattedDateFiled}", "${formattedDateEvent}", "${formattedStartTime}", "${formattedEndTime}", "${formattedDateAccomplished}", "${receivedBy}")`)

  res.send({ message: "successful ah"})
})
app.get("/event/all", (req, res) => {
  db.query("SELECT * FROM `events`", (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(results);
  });
});
app.delete("/event/delete/:id", (req) => {
  const { id } = req.params;

  db.query(`DELETE FROM events WHERE id = ${id}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const mysql = require("mysql2/promise");
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

const eventRequestsController = {
  async getAllEventRequests(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const [rows] = await connection.execute("SELECT * FROM EventRequests LIMIT ? OFFSET ?", [
        parseInt(limit),
        parseInt(offset),
      ]);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createEventRequest(req, res) {
    try {
      const { Address, purpose, facility, requestedBy, approvedBy, dateEvent } = req.body;

      if (!Address || !purpose || !facility || !requestedBy || !approvedBy) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      const [result] = await connection.execute(
        `INSERT INTO EventRequests 
         (Address, purpose, facility, requestedBy, approvedBy, dateEvent) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [Address, purpose, facility, requestedBy, approvedBy, dateEvent]
      );

      // Emit real-time event
      const io = req.app.get("io");
      io.emit("event-created", {
        id: result.insertId,
        Address,
        purpose,
        facility,
        requestedBy,
        approvedBy,
        dateEvent,
      });

      res.status(201).json({ message: "Event created successfully", id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateEventRequest(req, res) {
    try {
      const { id } = req.params;
      const { Address, purpose, facility, requestedBy, approvedBy, dateEvent } = req.body;

      const [result] = await connection.execute(
        `UPDATE EventRequests 
         SET Address = ?, purpose = ?, facility = ?, requestedBy = ?, approvedBy = ?, dateEvent = ? 
         WHERE id = ?`,
        [Address, purpose, facility, requestedBy, approvedBy, dateEvent, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Emit real-time event
      const io = req.app.get("io");
      io.emit("event-updated", { id, Address, purpose, facility, requestedBy, approvedBy, dateEvent });

      res.status(200).json({ message: "Event updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteEventRequest(req, res) {
    try {
      const { id } = req.params;

      const [result] = await connection.execute("DELETE FROM EventRequests WHERE id = ?", [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Emit real-time event
      const io = req.app.get("io");
      io.emit("event-deleted", { id });

      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = eventRequestsController;

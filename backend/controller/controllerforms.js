const express = require("express");
const router = express.Router();
const eventRequestsController = require("./controllers/eventRequestsController");
const authenticate = require("./middleware/authenticate");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");

// Apply logger globally
router.use(logger);

// Protected routes
router.get("/event-requests", authenticate, eventRequestsController.getAllEventRequests);
router.get("/event-requests/count", authenticate, eventRequestsController.getEventCount);
router.get("/event-requests/:id", authenticate, eventRequestsController.getEventRequestById);
router.post("/event-requests", authenticate, eventRequestsController.createEventRequest);
router.put("/event-requests/:id", authenticate, eventRequestsController.updateEventRequest);
router.delete("/event-requests/:id", authenticate, eventRequestsController.deleteEventRequest);

// Error handler
router.use(errorHandler);

module.exports = router;

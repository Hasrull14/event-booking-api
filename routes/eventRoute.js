const express = require('express')
const eventRouter = express.Router();

const controller = require('../controllers/eventController')

eventRouter.get("/", controller.getEvents)
eventRouter.get("/:id", controller.getEventById);
eventRouter.post("/", controller.createEvent);
eventRouter.patch("/:id", controller.updateEvent);
eventRouter.delete("/:id", controller.deleteEvent);

module.exports = eventRouter



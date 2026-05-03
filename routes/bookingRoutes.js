const express = require('express')
const bookingRouter = express.Router();

const controller = require('../controllers/bookingController')

bookingRouter.get("/", controller.getBookings)
bookingRouter.get("/:id", controller.getBooking);
bookingRouter.post("/", controller.createBooking);
bookingRouter.patch("/:id", controller.editBooking);
bookingRouter.delete("/:id", controller.deleteBooking);

module.exports = bookingRouter



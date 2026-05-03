const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    seatsBooked: { type: Number, required: true },
  }, { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);

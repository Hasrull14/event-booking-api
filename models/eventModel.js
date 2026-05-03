const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    seats: { type: Number, required: true },
  }, { timestamps: true },
);

module.exports = mongoose.model("Event", eventSchema);

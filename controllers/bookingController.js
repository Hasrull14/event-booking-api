const Booking = require("../models/bookingModel"); //Model dari Schema Booking
const Event = require("../models/eventModel"); //Model dari Schema Event

//Get All Booking
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("eventId");

    if (bookings.length === 0) {
      return res.status(404).json({ message: "Data belum ada" });
    }

    res.status(200).json({ count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findById(id).populate("eventId");

    if (!booking) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json({ data: booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, eventId, seatsBooked } = req.body;
    if (!userId || !eventId || !seatsBooked) {
      return res.status(400).json({ message: "data tidak lengkap" });
    }
    if (seatsBooked <= 0) {
      return res.status(400).json({ message: "Minimal pesan 1 kursi" });
    }
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event tidak ditemukan" });
    }
    const now = new Date();
    if (new Date(event.date) < now) {
      return res.status(400).json({ message: "Tidak bisa memesan event yang sudah lewat" });
    }
    if (event.seats < seatsBooked) {
      return res.status(400).json({ message: "Kursi tidak cukup" });
    }
    event.seats -= seatsBooked;
    await event.save();
    const addBooking = await Booking.create({
      userId,
      eventId,
      seatsBooked,
    });
    res.status(201).json({ message: "Event telah dibooking", data: addBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update Booking
exports.editBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId, eventId, seatsBooked } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Data Booking tidak ditemukan" });
    }
    const event = await Event.findById(booking.eventId);
    if (!event) {
      return res.status(404).json({ message: "Data Event tidak ditemukan" });
    }
    event.seats += booking.seatsBooked;
    event.seats -= seatsBooked;
    await event.save();
    const bookingEdited = await Booking.findByIdAndUpdate(
      id,
      {
        userId,
        eventId,
        seatsBooked,
      },
      { new: true },
    );
    res.status(200).json({ message: "Mengedit data berdasarkan id", data: bookingEdited });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//Delete Booking
exports.deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteEvent = await Booking.findByIdAndDelete(id);
    if (!deleteEvent) {
      return res.status(404).json({ message: "data tidak ditemukan" });
    }

    res.status(200).json({ message: "data already delete" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};


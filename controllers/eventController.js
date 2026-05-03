const Event = require("../models/eventModel"); //Model dari schema event

// Get All Events
exports.getEvents = async (req, res) => {
  try {
    const { title, location, date } = req.query;
    let queryObj = {};
    if (title) {
      queryObj.title = { $regex: title, $options: "i" };
    }
    if (location) {
      queryObj.location = { $regex: location, $options: "i" };
    }
    if (date) {
      queryObj.date = date;
    }
    const events = await Event.find(queryObj);
    if (events.length === 0) {
      return res.status(404).json({ message: "data belum ada" });
    }
    res.status(200).json({
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get Single Event
exports.getEventById = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "data tidak ditemukan" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { title, location, seats, date } = req.body;
    if (!title || !location || !seats || !date) {
      return res.status(400).json({ message: "data tidak lengkap" });
    }
    const addEvent = await Event.create({
      title,
      location,
      seats,
      date,
    });
    res.status(201).json({
      message: "data created",
      data: addEvent,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//Update Event
exports.updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, location, date, seats } = req.body;
    const editEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        location,
        seats,
        date,
      },
      { new: true },
    );
    if (!editEvent) {
      return res.status(404).json({ message: "data tidak ditemukan" });
    }
    res.status(200).json({ message: "data edited", data: editEvent });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteEvent = await Event.findByIdAndDelete(id);
    if (!deleteEvent) {
      return res.status(404).json({ message: "data tidak ditemukan" });
    }

    res.status(200).json({ message: "data already delete" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

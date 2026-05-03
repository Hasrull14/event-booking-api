const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const eventRouter = require("./routes/eventRoute.js");
const bookingRouter = require("./routes/bookingRoutes.js");

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

//event route
app.use("/api/event", eventRouter);

//booking route
app.use("/api/booking", bookingRouter);

//konek database dan menjalankan server
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("database connect succesfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema(
  {
    customerName: String,
    roomNo: Number,
    hotelName: String,
    Date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", BookingSchema);

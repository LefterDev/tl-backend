const { Schema, model } = require("mongoose");

const BookingSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    default: " ",
  },
  last_name: {
    type: String,
    required: true,
    default: " ",
  },
  payment_method: {
    type: String,
    required: true,
    default: " ",
  },
  boat_booked: {
    type: String,
    required: true,
    default: " ",
  },
  people: {
    type: Number,
    required: true,
    default: 1,
  },
  skipper: {
    type: Boolean,
    required: true,
    default: false,
  },
  bookDate: {
    type: Date,
    required: true,
  },
  endBookDate: {
    type: Date,
    required: true,
  },
});

const Booking = model("Bookings", BookingSchema, "Bookings");

module.exports = Booking;

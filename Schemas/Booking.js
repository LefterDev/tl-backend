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
  email: {
    type: String,
    required: true,
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
  phone_number: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
    default: " ",
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

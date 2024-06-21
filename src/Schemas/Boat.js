const { Schema, model } = require("mongoose");

const BoatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  features: {
    type: Object,
    required: true,
  },
  construction_year: {
    type: Number,
    required: true,
  },
  url_name: {
    type: String,
    required: true,
  },
});

const Boat = model("Boats", BoatSchema, "Boats");
module.exports = Boat;

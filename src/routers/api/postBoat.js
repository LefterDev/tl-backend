const { Router } = require("express");
const Boat = require("../../Schemas/Boat");

const postBoatApi = Router();

postBoatApi.post("/", (req, res) => {
  const { data } = req.body;
  const query = {
    url_name: data["url_name"] || "Not provided",
    name: data["name"] || "Not provided",
    features: data["features"] || [],
    construction_year: data["construction_year"] || 0,
  };
  new Boat(query).save();
  res.send(query);
});

module.exports = postBoatApi;

const { Router } = require("express");
const Boat = require("../../Schemas/Boat");

const getBoatRouter = Router();

getBoatRouter.get("/", async (req, res) => {
  const getDbEntries = await Boat.find({});
  res.json(getDbEntries);
});

module.exports = getBoatRouter;

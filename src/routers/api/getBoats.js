const { Router } = require("express");
const Boat = require("../../Schemas/Boat");

const getBoatRouter = Router();

getBoatRouter.get("/", async (req, res) => {
  const getDbEntries = await Boat.find({});
  return res.send(getDbEntries);
});

module.exports = getBoatRouter;

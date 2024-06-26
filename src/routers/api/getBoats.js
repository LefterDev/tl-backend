const { Router } = require("express");
const Boat = require("../../Schemas/Boat");

const getBoatsRouter = Router();

getBoatsRouter.get("/", async (req, res) => {
  const getDbEntries = await Boat.find({});
  return res.send(getDbEntries);
});

module.exports = getBoatsRouter;

const { Router } = require("express");
const Boat = require("../../Schemas/Boat");

const getBoatRouter = Router();

getBoatRouter.get("/", async (req, res) => {
  const result = await Boat.findOne({ url_name: req.query.url_name });
  if (result == null) return res.status(404).send("Boat not found!");
  else return res.send(result);
});

module.exports = getBoatRouter;

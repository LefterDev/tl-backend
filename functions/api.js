import express from "express";
import { connect } from "mongoose";
import "dotenv/config";
import ServerlessHttp from "serverless-http";
import Boat from "../Schemas/Boat";
import cors from "cors";
const app = express();
connect(
  "mongodb+srv://lefter:lekais09@travel-agency.zmvnrxx.mongodb.net/travel-agency"
).then(() => console.log("DB connected"));

app.use(cors());

app.get("/.netlify/functions/api/get-boats", async (req, res) => {
  res.send(await Boat.find({}));
});

app.get("/.netlify/functions/api/get-boat", async (req, res) => {
  const result = await Boat.findOne({ url_name: req.query.url_name });
  if (result == null) return res.status(404).send("Boat not found!");
  else return res.send(result);
});

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};

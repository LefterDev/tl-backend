import express from "express";
import { connect } from "mongoose";
import "dotenv/config";
import ServerlessHttp from "serverless-http";
import Boat from "../Schemas/Boat";
import cors from "cors";
import { json } from "body-parser";
import { authenticationMiddleWare } from "../middleware/authentication";
const app = express();
connect(
  "mongodb+srv://lefter:lekais09@travel-agency.zmvnrxx.mongodb.net/travel-agency"
).then(() => console.log("DB connected"));

app.use(cors());
app.use(json());
app.use(authenticationMiddleWare);
app.get("/.netlify/functions/api/get-boats", async (req, res) => {
  res.send(await Boat.find({}));
});

app.get("/.netlify/functions/api/get-boat", async (req, res) => {
  const result = await Boat.findOne({ url_name: req.query.url_name });
  if (result == null) return res.status(404).send("Boat not found!");
  else return res.send(result);
});

app.post("/.netlify/functions/api/book-boat", async (req, res) => {
  const boat = req.query.url_name;
  const startDate = req.params.start_date;
  const toDate = req.params.toDate;
  await Boat.updateOne(
    { url_name: boat },
    { $push: { bookDates: [`${startDate} - ${toDate}`] } }
  ).then(() => {
    res.send({
      message: `Booking for ${boat} from ${startDate} to ${toDate} was made successfully`,
    });
    console.log(`Booked ${boat}. start: ${startDate}. end: ${toDate}`);
    return;
  });
});

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};

import express from "express";
import { connect } from "mongoose";
import "dotenv/config";
import ServerlessHttp from "serverless-http";
import Boat from "../Schemas/Boat";
import cors from "cors";
import { json } from "body-parser";
import { authenticationMiddleWare } from "../middleware/authentication";
import Booking from "../Schemas/Booking";
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
  const startDate = req.body.start_date;
  const toDate = req.body.toDate;
  new Booking({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    payment_method: req.body.payment_method,
    boat_booked: req.query.url_name,
    people: req.body.people,
    skipper: req.body.skipper,
    bookDate: startDate,
    endBookDate: toDate,
  }).save();
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
//TODO Add admin middleware here
app.get("/.netlify/functions/api/bookings-admin", async (req, res) => {
  return res.send(await Booking.find({}));
});

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};

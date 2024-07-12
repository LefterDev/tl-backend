import express from "express";
import { connect } from "mongoose";
import "dotenv/config";
import ServerlessHttp from "serverless-http";
import Boat from "../Schemas/Boat";
import cors from "cors";
import { json } from "body-parser";
import { authenticationMiddleWare } from "../middleware/authentication";
import Booking from "../Schemas/Booking";
import { bookedDate, validateDate } from "../utilities/dateValidation";
import { validatePaymentMethod } from "../utilities/paymentMethodValidation";
const app = express();
connect(process.env.MONGODB_URI).then(() => console.log("DB connected"));

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
  const startDate = new Date(req.body.start_date);
  const toDate = new Date(req.body.toDate);
  const payment_method = req.body.payment_method;
  const phone_number = req.body.phone_number;
  if (!validatePaymentMethod(payment_method))
    return res.status(500).send({ error: "Invalid payment method" });
  if (!validateDate(startDate.getTime(), toDate.getTime()))
    return res.status(500).send({ error: "Invalid Date" });
  if (bookedDate(startDate.getTime()))
    return res.status(500).send({ error: "Date already booked" });

  const booking = new Booking({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    payment_method: payment_method,
    boat_booked: req.query.url_name,
    phone_number: phone_number,
    skipper: req.body.skipper,
    bookDate: startDate,
    endBookDate: toDate,
  });

  await Boat.updateOne(
    { url_name: boat },
    { $push: { bookDates: [`${startDate} - ${toDate}`] } }
  ).then(() => {
    res.status(200).send({
      message: `Booking for ${boat} from ${startDate} to ${toDate} was made successfully`,
    });
    booking.save();
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

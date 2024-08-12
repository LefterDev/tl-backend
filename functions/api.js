require("dotenv").config();
const express = require("express");
const { connect } = require("mongoose");
const Boat = require("../Schemas/Boat");
const cors = require("cors");
const { json } = require("body-parser");
const { authenticationMiddleWare } = require("../middleware/authentication");
const Booking = require("../Schemas/Booking");
const { bookedDate, validateDate } = require("../utilities/dateValidation");
const {
  validatePaymentMethod,
} = require("../utilities/paymentMethodValidation");
const app = express();
connect(process.env.MONGODB_URI).then(() => console.log("DB connected"));

app.use(cors());
app.use(json());
app.use(authenticationMiddleWare);
app.get("/api/get-boats", async (req, res) => {
  res.send(await Boat.find({}));
});

app.get("/api/get-boat", async (req, res) => {
  const result = await Boat.findOne({ url_name: req.query.url_name });
  if (result == null) return res.status(404).send("Boat not found!");
  else return res.send(result);
});

app.post("/api/book-boat", async (req, res) => {
  const boat_url = req.query.url_name;

  const {
    payment_method,
    phone_number,
    remarks,
    first_name,
    last_name,
    email,
    startDate,
    toDate,
    boat,
  } = req.body;
  // if (!validatePaymentMethod(payment_method))
  //   return res.status(500).send({ error: "Invalid payment method" });
  // if (!validateDate(startDate.getTime(), toDate.getTime()))
  //   return res.status(500).send({ error: "Invalid Date" });
  // if (bookedDate(startDate.getTime()))
  //   return res.status(500).send({ error: "Date already booked" });

  const booking = new Booking({
    first_name: first_name,
    last_name: last_name,
    email: email,
    // payment_method: payment_method,
    boat_booked: boat.name,
    phone_number: phone_number,
    remarks: remarks,
    // skipper: req.body.skipper,
    bookDate: new Date(startDate),
    endBookDate: new Date(toDate),
  });

  await Boat.updateOne(
    { url_name: boat_url },
    { $push: { bookDates: [`${startDate} - ${toDate}`] } }
  ).then(() => {
    res.status(200).send({
      message: `Pre-booking for ${boat.name} from ${startDate} to ${toDate} was made successfully`,
    });
    booking.save();
    return;
  });
});
//TODO Add admin middleware here
app.get("/api/bookings-admin", async (req, res) => {
  return res.send(await Booking.find({}));
});

app.get("/api/closed-dates", async (req, res) => {
  const query = await Booking.find({});
  if (query == null)
    return res
      .status(500)
      .send({ error: "An error occured within the server" });
  const bookDates = [];
  for (const item of query) {
    bookDates.push(`${item.bookDate} - ${item.endBookDate}`);
  }
  return res.status(200).send(bookDates);
});

app.listen(8080, () => {
  console.log("Localhost is open");
});
// const handler = ServerlessHttp(app);

// module.exports.handler = async (event, context) => {
//   const result = await handler(event, context);
//   return result;
// };

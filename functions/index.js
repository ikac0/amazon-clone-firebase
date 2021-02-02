const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
// reaching out to the endpoint (specified down the page) and according to the route that we provide, we send the following file as sendFile, or .send('hello world') or whatever it is.
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// App listen
exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/clone-f8cb2/us-central1/api

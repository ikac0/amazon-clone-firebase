const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HSAocDN9xeII8YokQSSFGolB10t0cKXTPCnQUBjJouRxn6QUV0dtZhsGyYLQcGmUGUbglM0Px9HS4Wm4nseNh8c00pqlyILII"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = Math.floor(request.query.total);

  console.log("Payment Request Recieved for: ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency / cents
    currency: "eur",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api

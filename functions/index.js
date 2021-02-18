const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response } = require("express");
const stripe = require("stripe")(
  // eslint-disable-next-line max-len
  "sk_test_51HSAocDN9xeII8YokQSSFGolB10t0cKXTPCnQUBjJouRxn6QUV0dtZhsGyYLQcGmUGUbglM0Px9HS4Wm4nseNh8c00pqlyILII"
);

// api

// app config
const app = express();

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// api
app.get("/", (request, response) => {
  response.status(200).send("hello there");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("the total, in cents is: ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currencty: "eur",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// listen command
exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/clone-c113d/us-central1/api

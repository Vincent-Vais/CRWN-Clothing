const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  path = require("path");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express(),
  PORT = process.env.port || 5000,
  STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };
  stripe.charges.create(body, (stripeErr, stipeRes) => {
    if (stripeErr) res.status(500).send(stripeErr);
    else res.status(200).send(stipeRes);
  });
});

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`App is listening on ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    Message: "Success!",
  });
});

app.post("/payment/create", async (req, resp) => {
  const total = req.query.total;

  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    resp.status(201).json({ clientSecret: paymentIntent.client_secret });
    console.log(paymentIntent);
  } else {
    resp.status(403).json({
      message: "Total must be greater than zero",
    });
  }
});

app.listen(5001, (err) => {
  if (err) throw err;
  console.log("Amazon surver running on PORT: 5001, https://localhost:5001");
});

import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_SECRET, {
  apiVersion: "2023-10-16",
});

// console.log(stripe);

export const processPayment = catchAsyncErrors(async (req, res, next) => {
  const payment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "ShoppingAdda",
    },
  });

  res.status(200).json({ succes: true, client_secret: payment.client_secret });
});

export const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

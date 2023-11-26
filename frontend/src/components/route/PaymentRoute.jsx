import React from "react";
import Payment from "../cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const PaymentRoute = ({ stripeApiKey }) => {
  const stripePromise = loadStripe(stripeApiKey);
  console.log(stripePromise);
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default PaymentRoute;

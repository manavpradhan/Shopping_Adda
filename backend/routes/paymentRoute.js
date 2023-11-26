import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";
import {
  processPayment,
  sendStripeApiKey,
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

export default router;

import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { CreditCard, Event, VpnKey } from "@mui/icons-material";
import "./style/payment.css";
import { clearErrors, createOrder } from "../../store/actions/orderActions";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const alert = useAlert();
  const dispatch = useDispatch();
  const myStripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { details } = useSelector((state) => state.shippingInfo);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo: details,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // payBtn.current.disabled = true;

    // try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };

    //   const { data } = await axios.post(
    //     "/api/v1/payment/process",
    //     paymentData,
    //     config
    //   );

    //   const client_secret = data.client_secret;

    //   if (!myStripe || !elements) return;

    //   const result = await myStripe.confirmCardPayment(client_secret, {
    //     payment_method: {
    //       card: elements.getElement(CardNumberElement),
    //       billing_details: {
    //         name: user.name,
    //         email: user.email,
    //         address: {
    //           line1: details.address,
    //           city: details.city,
    //           state: details.state,
    //           postal_code: details.pinCode,
    //           country: details.country,
    //         },
    //       },
    //     },
    //   });

    //   if (result.error) {
    //     payBtn.current.disabled = false;
    //     alert.error(result.error.message);
    //   } else {
    //     if (result.paymentIntent.status === "succeeded") {
    //       alert.success("Payment Successful");
    //     } else {
    //       alert.error("There's some issue while processing payment ");
    //     }
    //   }
    // } catch (error) {
    //   payBtn.current.disabled = false;
    //   console.log(error.response.data.message);
    //   alert.error(error.response.data.message);
    // }
    order.paymentInfo = { id: "payemnt", status: "paid" };
    dispatch(createOrder(order));
    alert.success("order created");
    navigate("/success");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <Event />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;

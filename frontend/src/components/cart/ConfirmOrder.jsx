import React from "react";
import "./style/confirmOrder.css";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";

const ConfirmOrder = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { details } = useSelector((state) => state.shippingInfo);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${details.address}, ${details.city}, ${details.state}, ${details.pinCode}, ${details.country}`;

  const proceedToPayment = async () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    // const stripe = await loadStripe(stripeApiKey)

    navigate("/process/payment");
  };

  return (
    <div>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info:</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name: </p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone: </p>
                <span>{details.phoneNo}</span>
              </div>
              <div>
                <p>Address: </p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => {
                  return (
                    <div key={item.product}>
                      <div className="cartProduct">
                        <img src={item.image} />
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;

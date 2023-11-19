import React from "react";
import "./style/confirmOrder.css";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";

const ConfirmOrder = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { details } = useSelector((state) => state.shippingInfo);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${details.address}, ${details.city}, ${details.state}, ${details.pinCode}, ${details.country}`;

  return (
    <div>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage"></div>
    </div>
  );
};

export default ConfirmOrder;

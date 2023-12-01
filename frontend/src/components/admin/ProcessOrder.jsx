import React, { useState, useEffect } from "react";
import "./style/processOrder.css";

import "./style/productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { AccountTree } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../store/actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../store/constants/orderConstants";
import Loader from "../layout/loader/Loader";

const ProcessOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const params = useParams();

  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.updateOrder
  );
  const [status, setStatus] = useState("");

  const updateOrderSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(params.id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order updated successfully");
      navigate("/admin/dashboard");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, alert, error, updateError, isUpdated, navigate, params.id]);

  return (
    <div>
      <MetaData title="Process Orders - Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer newProductContainerPo">
          {loading ? (
            <Loader />
          ) : (
            <div
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
              className="confirmOrderPage confirmOrderPagePo"
            >
              <div>
                <div className="confirmShippingArea confirmShippingAreaPo">
                  <Typography>Shipping Info:</Typography>
                  <div className="confirmShippingAreaBox confirmShippingAreaBoxPo">
                    <div>
                      <p>Name: </p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone: </p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address: </p>
                      <span>
                        {" "}
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="confirmShippingArea paymentArea">
                  <Typography>Payment:</Typography>
                  <div className="orderDetailsContainerBox orderDetailsContainerBoxPo">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "paid"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "paid"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>
                </div>
                <div className="confirmShippingArea orderStatus">
                  <Typography>Order Status:</Typography>
                  <div className="orderDetailsContainerBox orderDetailsContainerBoxPo">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems confirmCartItemsPo">
                  <Typography>Cart Items:</Typography>
                  <div className="confirmCartItemsContainer confirmCartItemsContainerPo">
                    {order.orderItems &&
                      order.orderItems.map((item) => {
                        return (
                          <div key={item.product}>
                            <div className="cartProduct">
                              <img src={item.image} />
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
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
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form className="updateOrderForm" onSubmit={updateOrderSubmit}>
                  <h1>Process Order</h1>

                  <div>
                    <AccountTree />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessOrder;

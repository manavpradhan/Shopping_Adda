import React, { Fragment, useEffect } from "react";
import "./style/myOrder.css";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Launch } from "@mui/icons-material";
import { clearErrors, myOrders } from "../../store/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layout/loader/Loader";

const MyOrder = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.9 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.5,
      // cellClassName: (params) => {
      //   return params.row.status === "Delivered" ? "greenColor" : "redColor";
      // },
      renderCell: (params) => {
        return (
          <p
            style={{
              color: `${params.row.status === "Delivered" ? "green" : "red"}`,
            }}
          >
            {params.row.status}
          </p>
        );
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.1,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.4,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/order/${params.row.id}`}>
              <p>View Details</p>
              <Launch />
            </Link>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name}'s Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrder;

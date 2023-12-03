import React, { Fragment, useEffect, useState } from "react";
import "./style/productReviews.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button, Backdrop, CircularProgress } from "@mui/material";
import { Delete, Star } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../store/actions/productActions";
import { DELETE_REVIEW_RESET } from "../../store/constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, reviews } = useSelector(
    (state) => state.productReviews
  );
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.updateReview);

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review deleted successfully");

      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, productId]);

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      renderCell: (params) => {
        return (
          <p
            style={{
              color: `${params.row.rating >= 3 ? "green" : "red"}`,
            }}
          >
            {params.row.rating}
          </p>
        );
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteReviewHandler(params.row.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  return (
    <Fragment>
      {deleteLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <MetaData title={`All Reviews - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;

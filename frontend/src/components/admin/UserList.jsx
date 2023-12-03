import React, { Fragment, useEffect } from "react";
import "./style/productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, Backdrop, CircularProgress } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from "../../store/actions/userActions";
import { DELETE_USER_RESET } from "../../store/constants/userConstants";

const UserList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);
  const {
    loading,
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      // navigate("/admin/dashboard");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, message]);

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      type: "number",
      flex: 0.3,
      renderCell: (params) => {
        return (
          <p
            style={{
              color: `${params.row.role === "admin" ? "green" : "red"}`,
            }}
          >
            {params.row.role}
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
            <Link to={`/admin/user/${params.row.id}`}>
              <Edit />
            </Link>

            <Button onClick={() => deleteUserHandler(params.row.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  return (
    <Fragment>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <MetaData title="All Users - Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UserList;

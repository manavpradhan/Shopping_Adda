import React from "react";
import "./style/notAdmin.css";
import { Typography } from "@mui/material";
import { Error } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NotAdmin = () => {
  return (
    <div className="errorContainer">
      <div className="notAdmin">
        <Error fontSize={"large"} />
        <Typography>This page is only accessible to Admin</Typography>
        <Link to="/products">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default NotAdmin;

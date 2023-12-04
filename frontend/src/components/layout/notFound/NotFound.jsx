import React from "react";
import "./notFound.css";
import { Error } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MetaData from "../MetaData";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <MetaData title={"Page Not Found"} />
      <Error />
      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;

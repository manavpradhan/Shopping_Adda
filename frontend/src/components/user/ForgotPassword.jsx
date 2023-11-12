import React, { Fragment, useState, useEffect } from "react";
import "./forgotPassword.css";
import Loader from "../layout/loader/Loader";
import { MailOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  forgotPassword,
} from "../../store/actions/userActions.js";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  return <div>ForgotPassword</div>;
};

export default ForgotPassword;

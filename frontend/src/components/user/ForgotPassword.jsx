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
import { RESET_STATE } from "../../store/constants/userConstants.js";

const ForgotPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", recoveryEmail);

    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);

      setTimeout(() => {
        dispatch({ type: RESET_STATE });
      }, 10000);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div>
                  <MailOutline />
                  <input
                    type="email"
                    name="email"
                    placeholder="Recovery Email"
                    required
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send Email"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;

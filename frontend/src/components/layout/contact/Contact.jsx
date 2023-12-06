import React from "react";
import "./contact.css";
import { Typography } from "@mui/material";
import MetaData from "../MetaData";

const Contact = () => {
  return (
    <div className="contactSection">
      <MetaData title={"Contact Us"} />
      <div></div>
      <div className="contactSectionGradient"></div>
      <div className="contactSectionContainer">
        <Typography component="h1">contact Us</Typography>

        <div className="screen">
          <div className="screen-header">
            <div className="screen-header-left">
              <div className="screen-header-button close"></div>
              <div className="screen-header-button maximize"></div>
              <div className="screen-header-button minimize"></div>
            </div>
            <div className="screen-header-right">
              <div className="screen-header-ellipsis"></div>
              <div className="screen-header-ellipsis"></div>
              <div className="screen-header-ellipsis"></div>
            </div>
          </div>
          <div className="screen-body">
            <div className="screen-body-item left">
              <div className="app-title">
                <span>CONTACT</span>
                <span>US</span>
              </div>
              <div className="app-email">
                MAIL US @
                <a href="mailto:shoppingadda680@gmail.com">
                  {"   "}
                  shoppingadda680@gmail.com
                </a>
              </div>
              <div className="app-contact">CALL US @ +62 81 314 928 595</div>
            </div>
            <div className="screen-body-item">
              <div className="app-form">
                <div className="app-form-group">
                  <input
                    type="text"
                    className="app-form-control"
                    placeholder="NAME"
                  />
                </div>
                <div className="app-form-group">
                  <input className="app-form-control" placeholder="EMAIL" />
                </div>
                <div className="app-form-group">
                  <input
                    type="number"
                    className="app-form-control"
                    placeholder="CONTACT NO"
                  />
                </div>
                <div className="app-form-group message">
                  <textarea
                    className="app-form-control"
                    placeholder="MESSAGE"
                  />
                </div>
                <div className="app-form-group buttons">
                  <button className="app-form-button">CANCEL</button>
                  <button className="app-form-button">SEND</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

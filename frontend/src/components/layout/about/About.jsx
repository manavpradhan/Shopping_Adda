import React from "react";
import "./about.css";
import { Button, Typography, Avatar } from "@mui/material";
import { YouTube, Instagram } from "@mui/icons-material";
import MetaData from "../MetaData";

const About = () => {
  return (
    <div className="aboutSection">
      <MetaData title={"About Us"} />
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dfd7ttlv8/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1701876362/avatars/ayioeewpocvu0aic795r.jpg"
              alt="Founder"
            />
            <Typography>Manav Pradhan</Typography>
            <Button color="primary">Visit Instagram</Button>
            <span>This is a sample wesbite made by @ManavPradhan.</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="" target="blank">
              <YouTube className="youtubeSvgIcon" />
            </a>

            <a href="" target="blank">
              <Instagram className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

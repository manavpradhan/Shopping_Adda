import React from "react";
import Rating from "@mui/material/Rating";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  return (
    <div className="reviewCard">
      <div className="user">
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
      </div>
      <Rating
        name="half-rating-read"
        value={review.rating}
        precision={0.5}
        readOnly
      />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;

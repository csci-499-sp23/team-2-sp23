import React from "react";
import FullStar from "@mui/icons-material/Star";
import PartStar from "@mui/icons-material/StarHalf";
import ZeroStar from "@mui/icons-material/StarOutline";

const starStyle = {
  color: "hsl(35,100%,45%)",
  width: "12px",
  height: "12px",
};

function ReviewStars({ rating, restaurantId }) {
  const MAX_STARS = 5;
  const fullStarCount = Math.floor(rating);
  const partStarCount = rating % 1 !== 0;
  const zeroStarCount = MAX_STARS - (fullStarCount + partStarCount);

  const ratingStars = [];
  for (let i = 0; i < fullStarCount; i++) {
    ratingStars.push(
      <FullStar style={starStyle} key={`${restaurantId}-full-${i}`} />
    );
  }
  for (let i = 0; i < partStarCount; i++) {
    ratingStars.push(
      <PartStar style={starStyle} key={`${restaurantId}-part-${i}`} />
    );
  }
  for (let i = 0; i < zeroStarCount; i++) {
    ratingStars.push(
      <ZeroStar style={starStyle} key={`${restaurantId}-zero-${i}`} />
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center" }}>{ratingStars}</div>
  );
}

export default ReviewStars;

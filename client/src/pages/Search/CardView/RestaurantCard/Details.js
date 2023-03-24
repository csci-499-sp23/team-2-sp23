import React from "react";
import ReviewStars from "../../../../components/ReviewStars";

const classes = {
  detailContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "160px",
  },
  title: {
    fontSize: "0.9rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  address: {
    fontSize: "0.7rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: " hsl(35,80%,40%)",
  },
  reviews: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  reviewCount: {
    fontSize: "0.6rem",
    color: "#5a5a5a",
  },
};

function Details({
  name,
  rating,
  reviewCount,
  address,
  state,
  zipCode,
  restaurantId,
}) {
  return (
    <div style={classes.detailContainer}>
      <div style={classes.title}>{name}</div>
      <div style={classes.address}>
        {address} {state}, {zipCode}
      </div>
      <div style={{ fontSize: "0.75rem" }}>
        <div style={classes.reviews}>
          <ReviewStars rating={rating} restaurantId={restaurantId} />
          <div style={classes.reviewCount}>({reviewCount})</div>
        </div>
      </div>
    </div>
  );
}

export default Details;

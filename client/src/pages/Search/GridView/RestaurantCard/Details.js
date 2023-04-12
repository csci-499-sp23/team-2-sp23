import React from "react";
import ReviewStars from "../../../../components/ReviewStars";
import { Link } from "react-router-dom";

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
    color: "black",
  },
  address: {
    fontSize: "0.7rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: "hsl(30,80%,40%)",
  },
  reviewContainer: {
    fontSize: "0.75rem",
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
  foodCategoryText: {
    fontSize: `${9 / 16}rem`,
    color: "#3d3d3d",
    marginTop: "auto",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
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
  foodCategories,
}) {
  return (
    <div style={classes.detailContainer}>
      <Link style={classes.title} to={`/restaurant?yelp_id=${restaurantId}`}>
        {name}
      </Link>
      <div style={classes.address}>
        {address} {state}, {zipCode}
      </div>
      <div style={classes.reviewContainer}>
        <div style={classes.reviews}>
          <ReviewStars rating={rating} restaurantId={restaurantId} />
          <div style={classes.reviewCount}>({reviewCount})</div>
        </div>
      </div>
      <div style={classes.foodCategoryText}>{foodCategories.join(" • ")}</div>
    </div>
  );
}

export default Details;

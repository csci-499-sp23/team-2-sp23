import React from "react";
import ImageCard from "./ImageCard";
import Details from "./Details";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { IconButton } from "@mui/material";

const classes = {
  cardContainer: {
    boxSizing: "border-box",
    width: "min(100%,310px)",
    height: "64px",
    border: "2px solid #5a5a5a",
    padding: "2px",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    backgroundColor: "hsl(35,0%,97%)",
  },
  retaurantInfo: {
    display: "flex",
    gap: "0.25rem",
    height: "100%",
  },
  foodInfo: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    marginLeft: "auto",
  },
  foodCount: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: "0.9rem",
  },
};

function RestaurantCard({ restaurant, foods }) {
  return (
    <div style={classes.cardContainer}>
      <div style={classes.retaurantInfo}>
        <ImageCard src={restaurant.image_url} />
        <Details
          name={restaurant.name}
          rating={restaurant.rating}
          reviewCount={restaurant.review_count}
          address={restaurant.address.address1}
          state={restaurant.address.state}
          zipCode={restaurant.address.zip_code}
          restaurantId={restaurant.yelp_id}
          foodCategories={restaurant.food_categories}
        />
      </div>
      <div style={classes.foodInfo}>
        <div style={classes.foodCount}>
          <div style={{ fontSize: "0.75rem" }}>{foods.length}</div>
          <FastfoodIcon
            style={{ color: "hsl(30,90%,50%)", fontSize: "0.75rem" }}
          />
        </div>
        <IconButton
          style={{ padding: 0 }}
          onClick={() => {
            window.open(restaurant.yelp_url, "_blank", "noreferrer");
          }}
        >
          <ChevronRightIcon style={{ padding: 0 }} />
        </IconButton>
      </div>
    </div>
  );
}

export default RestaurantCard;

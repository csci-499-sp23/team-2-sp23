import React from "react";
import ImageCard from "./ImageCard";
import Details from "./Details";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Button } from "@mui/material";

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
    alignItems: "center",
    gap: "0.25rem",
    minHeight: 0,
    minWidth: 0,
    padding: 0,
    paddingInline: "0.5rem",
    marginRight: "0.5rem",
  },
  title: {
    fontSize: "0.9rem",
  },
};

function RestaurantCard({ restaurant, foods, setModalFoods, openModal }) {
  return (
    <div style={classes.cardContainer}>
      <div style={classes.retaurantInfo}>
        <ImageCard
          src={restaurant.image_url}
          restaurantId={restaurant._id}
          restaurantName={restaurant.name}
        />
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
      {!!foods && foods.length !== 0 && (
        <div style={classes.foodInfo}>
          <Button
            style={classes.foodCount}
            variant="outlined"
            onClick={() => {
              setModalFoods(foods);
              openModal();
            }}
          >
            <span style={{ fontSize: "0.75rem", fontWeight: 400 }}>
              {foods.length}
            </span>
            <FastfoodIcon
              style={{ color: "hsl(30,90%,50%)", fontSize: "0.75rem" }}
            />
          </Button>
        </div>
      )}
    </div>
  );
}

export default RestaurantCard;

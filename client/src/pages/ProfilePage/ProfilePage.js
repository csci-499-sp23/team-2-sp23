import React from "react";
import RestaurantCard from "../Search/GridView/RestaurantCard";
import { Box } from "@mui/material";

const classes = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  restaurantList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
  },
};

export default function ProfilePage({ user }) {
  return (
    <div style={classes.container}>
      <Box
        sx={{
          borderLeft: 2,
          borderColor: "primary.main",
          paddingLeft: "0.5rem",
        }}
      >
        Saved Restaurants ({user.saved_restaurants.length})
      </Box>
      <div style={classes.restaurantList}>
        {user.saved_restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant._id} />
        ))}
      </div>
    </div>
  );
}

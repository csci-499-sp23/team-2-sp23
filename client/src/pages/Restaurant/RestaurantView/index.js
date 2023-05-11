import Header from "./Header";
import FoodList from "../FoodList";
import RestaurantInfo from "./RestaurantInfo";
import { useState } from "react";
import { Box, TextField } from "@mui/material";

export default function RestaurantView({ restaurant, foods }) {
  const [budget, setBudget] = useState("");
  const foodsInBudget = foods.filter((food) => {
    if (budget === "") {
      return true;
    }
    return food.price <= budget;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Header restaurant={restaurant} />
      <RestaurantInfo restaurant={restaurant} />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "1rem",
          width: "300px",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            borderLeft: 2,
            borderColor: "primary.main",
            paddingLeft: "0.5rem",
            height: "fit-content",
            marginBottom: "6px",
          }}
        >
          Menu Items ({foodsInBudget.length})
        </Box>
        <TextField
          id="standard-basic"
          label="Budget"
          value={budget}
          variant="standard"
          onChange={(event) => {
            setBudget(event.target.value);
          }}
          style={{ width: "6.5rem" }}
          InputProps={{
            type: "number",
          }}
        />
      </div>
      <FoodList foods={foodsInBudget} />
    </div>
  );
}

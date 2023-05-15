import BudgetFilter from "../../../components/Filters/RestarurantBudgetFilter";
import FoodList from "../FoodList";
import Header from "./Header";
import RestaurantInfo from "./RestaurantInfo";
import { useState } from "react";
import RestaurantMap from "../RestaurantMap/Map";
import { HUNTER_COLLEGE_COORDINATES } from "../../Search/constants";

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
      <RestaurantMap
        latitude={HUNTER_COLLEGE_COORDINATES.latitude}
        longitude={HUNTER_COLLEGE_COORDINATES.longitude}
      />
      <RestaurantInfo restaurant={restaurant} />
      <BudgetFilter
        foodsInBudget={foodsInBudget}
        budget={budget}
        setBudget={setBudget}
      />
      <FoodList foods={foodsInBudget} />
    </div>
  );
}

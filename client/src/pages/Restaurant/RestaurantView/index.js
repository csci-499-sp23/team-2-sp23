import BudgetFilter from "../../../components/Filters/RestarurantBudgetFilter";
import FoodList from "../FoodList";
import Header from "./Header";
import RestaurantInfo from "./RestaurantInfo";
import { useState } from "react";
import RestaurantMap from "../RestaurantMap";

export default function RestaurantView({ restaurant, foods }) {
  const [budget, setBudget] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const sortedBudgetFoods = foods.sort((a, b) => {
    return sortDirection === -1 ? b.price - a.price : a.price - b.price;
  });

  const foodsInBudget = sortedBudgetFoods.filter((food) => {
    if (budget === "") {
      return true;
    }
    return food.price <= budget;
  });

  const handleSortChange = (event) => {
    setSortDirection(event.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Header restaurant={restaurant} />
      <RestaurantInfo restaurant={restaurant} />
      <RestaurantMap
        restaurantLatitude={restaurant.location.coordinates[1]}
        restaurantLongitude={restaurant.location.coordinates[0]}
      />
      <BudgetFilter
        foodsInBudget={foodsInBudget}
        budget={budget}
        setBudget={setBudget}
      />
      <FoodList foods={foodsInBudget} />
    </div>
  );
}

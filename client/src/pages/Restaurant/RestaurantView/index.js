import BudgetFilter from "../../../components/Filters/RestarurantBudgetFilter";
import PriceSortButton from "../../../components/PriceSortButton";
import FoodList from "../FoodList";
import Header from "./Header";
import RestaurantInfo from "./RestaurantInfo";
import { useState } from "react";
import RestaurantMap from "../RestaurantMap";

export default function RestaurantView({ restaurant, foods }) {
  const [budget, setBudget] = useState("");
  const [sortDirection, setSortDirection] = useState(1);

  const sortedBudgetFoods = foods.sort((a, b) => {
    return sortDirection === -1 ? b.price - a.price : a.price - b.price;
  });

  const foodsInBudget = sortedBudgetFoods.filter((food) => {
    if (budget === "") {
      return true;
    }
    return food.price <= budget;
  });

  const handleSortChange = () => {
    setSortDirection((sortDirection) => -sortDirection);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Header restaurant={restaurant} />
      <RestaurantInfo restaurant={restaurant} />
      <RestaurantMap
        restaurantLatitude={restaurant.location.coordinates[1]}
        restaurantLongitude={restaurant.location.coordinates[0]}
      />
      <div style={{ display: "flex" }}>
        <BudgetFilter
          foodsInBudget={foodsInBudget}
          budget={budget}
          setBudget={setBudget}
        />
        <PriceSortButton
          handleSortChange={handleSortChange}
          sortDirection={sortDirection}
        />
      </div>
      <FoodList foods={foodsInBudget} />
    </div>
  );
}

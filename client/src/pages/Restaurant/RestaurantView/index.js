import BudgetFilter from "../../../components/Filters/RestarurantBudgetFilter";
import FoodList from "../FoodList";
import Header from "./Header";
import RestaurantInfo from "./RestaurantInfo";
import { useState } from "react";

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
      <BudgetFilter foodsInBudget={foodsInBudget} budget={budget} setBudget={setBudget}/>
      <FoodList foods={foodsInBudget} />
    </div>
  );
}

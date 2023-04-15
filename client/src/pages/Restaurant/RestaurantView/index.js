import Header from "./Header";

import FoodList from "../FoodList";
import RestaurantInfo from "./RestaurantInfo";

export default function RestaurantView({ restaurant, foods }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Header restaurant={restaurant} />
      <RestaurantInfo restaurant={restaurant} />
      <FoodList foods={foods} />
    </div>
  );
}

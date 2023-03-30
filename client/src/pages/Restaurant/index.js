import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { parseQueryParams } from "../../utils/parseQueryParams";
import RestaurantAPI from "../../api/restaurant-api";
import Header from "./Header";

function Restaurant() {
  const { search } = useLocation();
  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState(null);

  async function retrieveRestaurant(yelpId) {
    const response = await RestaurantAPI.getRestaurantByYelpId(yelpId).catch(
      console.error
    );
    if (!response) return;

    setRestaurant(response.restaurant);
    setFoods(response.foods);
  }

  useEffect(() => {
    const queryString = search.split("?")[1];
    const queryParams = parseQueryParams(queryString);
    const yelpId = queryParams.yelp_id;

    retrieveRestaurant(yelpId);
  }, [search]);

  return !!restaurant ? (
    <div>
      <Header />
      {restaurant.name}
      {foods.length}
    </div>
  ) : (
    <div>No restaurant found</div>
  );
}

export default Restaurant;

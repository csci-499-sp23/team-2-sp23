import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { parseQueryParams } from "../../utils/parseQueryParams";
import RestaurantAPI from "../../api/restaurant-api";
import RestaurantView from "./RestaurantView";
import FallbackView from "./FallBackView";

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
    <RestaurantView restaurant={restaurant} foods={foods} />
  ) : (
    <FallbackView />
  );
}

export default Restaurant;

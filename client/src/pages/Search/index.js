import CardView from "./CardView";
import RestaurantAPI from "../../api/restaurant-api";
import { useEffect, useState } from "react";

export default function Search({ coordinates }) {
  const [restaurants, setRestaurants] = useState([]);
  async function retrieveRestaurants({ longitude, latitude, meters, budget }) {
    const query = {
      longitude,
      latitude,
      meters,
      budget,
    };
    const retrievedRestaurants =
      await RestaurantAPI.getNearbyRestaurantsInBudget(query);

    console.log(retrievedRestaurants);

    setRestaurants(retrievedRestaurants.rows);
  }

  useEffect(() => {
    if (!coordinates.longitude) return;

    retrieveRestaurants({
      longitude: -73.96455592421076,
      latitude: 40.767851967738736,
      meters: 300,
      budget: 100,
    });
  }, [coordinates]);

  return (
    <div>
      <CardView rows={restaurants} />
    </div>
  );
}

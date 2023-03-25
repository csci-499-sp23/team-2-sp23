import api from "./api";

async function getNearbyRestaurants({ longitude, latitude, meters }) {
  return api({
    method: "get",
    endpoint: "/restaurant/nearby",
    query: {
      longitude: longitude,
      latitude: latitude,
      meters: meters,
    },
  });
}

async function getNearbyRestaurantsInBudget({
  longitude,
  latitude,
  meters,
  budget,
}) {
  return api({
    method: "get",
    endpoint: "/restaurant/nearby-in-budget",
    query: {
      longitude: longitude,
      latitude: latitude,
      meters: meters,
      budget: budget,
    },
  });
}

const RestaurantAPI = {
  getNearbyRestaurants,
  getNearbyRestaurantsInBudget,
};

export default RestaurantAPI;

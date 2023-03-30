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

async function getRestaurantByYelpId(yelpId) {
  return api({
    method: "get",
    endpoint: "restaurant/find-yelp-id",
    query: {
      yelp_id: yelpId,
    },
  });
}

const RestaurantAPI = {
  getNearbyRestaurants,
  getNearbyRestaurantsInBudget,
  getRestaurantByYelpId,
};

export default RestaurantAPI;

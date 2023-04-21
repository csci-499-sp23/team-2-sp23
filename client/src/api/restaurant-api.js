import api from "./api";

async function getNearbyRestaurants(
  { longitude, latitude, meters },
  controller
) {
  return api(
    {
      method: "get",
      endpoint: "/restaurant/nearby",
      query: {
        longitude: longitude,
        latitude: latitude,
        meters: meters,
      },
    },
    controller
  );
}

async function getNearbyRestaurantsInBudget(
  { longitude, latitude, meters, budget },
  controller
) {
  return api(
    {
      method: "get",
      endpoint: "/restaurant/nearby-in-budget",
      query: {
        longitude: longitude,
        latitude: latitude,
        meters: meters,
        budget: budget,
      },
    },
    controller
  );
}

async function getRestaurantByYelpId(yelpId, controller) {
  return api(
    {
      method: "get",
      endpoint: "restaurant/find-yelp-id",
      query: {
        yelp_id: yelpId,
      },
    },
    controller
  );
}

const RestaurantAPI = {
  getNearbyRestaurants,
  getNearbyRestaurantsInBudget,
  getRestaurantByYelpId,
};

export default RestaurantAPI;

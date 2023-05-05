import api from "./api";

async function getNearbyRestaurants(query, controller) {
  return api(
    {
      method: "get",
      endpoint: "/restaurant/nearby",
      query: query,
    },
    controller
  );
}

async function getNearbyRestaurantsInBudget(query, controller) {
  return api(
    {
      method: "get",
      endpoint: "/restaurant/nearby-in-budget",
      query: query,
    },
    controller
  );
}

async function getRestaurantByYelpId(yelpId, controller) {
  return api(
    {
      method: "get",
      endpoint: "/restaurant/find-yelp-id",
      query: {
        yelp_id: yelpId,
      },
    },
    controller
  );
}
async function getNearbyCategoriesInBudget(query, controller) {
  return api(
    {
      method: "get",
      endpoint: "/restaurant/find-nearby-food-categories",
      query: query,
    },
    controller
  );
}

const RestaurantAPI = {
  getNearbyRestaurants,
  getNearbyRestaurantsInBudget,
  getRestaurantByYelpId,
  getNearbyCategoriesInBudget,
};

export default RestaurantAPI;

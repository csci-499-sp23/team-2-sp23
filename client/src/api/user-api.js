import api from "./api";

async function createUser(auth0Id, controller) {
  return api(
    {
      method: "post",
      endpoint: "/user/create",
      body: {
        auth0_id: auth0Id,
      },
    },
    controller
  );
}

async function saveRestaurant(userId, restaurantId, controller) {
  return api(
    {
      method: "put",
      endpoint: "/user/save-restaurant",
      body: {
        user_id: userId,
        restaurant_id: restaurantId,
      },
    },
    controller
  );
}

async function unsaveRestaurant(userId, restaurantId, controller) {
  return api(
    {
      method: "put",
      endpoint: "/user/unsave-restaurant",
      body: {
        user_id: userId,
        restaurant_id: restaurantId,
      },
    },
    controller
  );
}

async function userProfile(userId, controller) {
  return api(
    {
      method: "get",
      endpoint: `/user/profile/${userId}`,
    },
    controller
  );
}

const UserAPI = {
  createUser,
  saveRestaurant,
  unsaveRestaurant,
  userProfile,
};

export default UserAPI;

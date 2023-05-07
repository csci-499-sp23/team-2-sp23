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

const UserAPI = {
  createUser,
};

export default UserAPI;

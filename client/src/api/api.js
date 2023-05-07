import axios from "axios";

export default async function Api(
  { method, endpoint, query, body },
  controller
) {
  const api = axios.create({
    baseURL:
      process.env.REACT_APP_SERVER_URL ?? "https://budget-eats.herokuapp.com/",
  });

  const request = {
    method: method,
    url: endpoint,
    params: query,
    data: body, // Use data instead of body for POST requests
  };

  // assuming you have already logged in the user using Auth0 and received the user object
  const auth0User = getUserFromAuth0();

  // retrieve the sub field from the auth0 user object
  const sub = auth0User.sub;

  if (method === "post" && endpoint === "/user/create") {
    // create a POST request to the /user/create endpoint with the sub value in the request body
    request.data = { sub };
  }

  return api({ ...request, signal: controller?.signal }).then((res) => res.data);
}

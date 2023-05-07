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
    data: body,
  };

  return api({ ...request, signal: controller?.signal }).then((res) => res.data);
}

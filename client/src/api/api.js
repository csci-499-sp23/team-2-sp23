import axios from "axios";

export default async function Api({ method, endpoint, query, body }) {
  const api = axios.create({
    baseURL:
      process.env.REACT_APP_SERVER_URL ?? "https://budget-eats.onrender.com",
  });

  const request = {
    method: method,
    url: endpoint,
    params: query,
    body: body,
  };

  return api(request).then((res) => res.data);
}

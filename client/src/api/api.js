import axios from "axios";

export default async function Api({ method, endpoint, query, body }) {
  const api = axios.create({
    baseURL: "http://localhost:3001",
  });

  const request = {
    method: method,
    url: endpoint,
    params: query,
    body: body,
  };

  return api(request).then((res) => res.data);
}

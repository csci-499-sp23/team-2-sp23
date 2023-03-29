import qs from "qs";

// Returns an object representing the query from an url
// ex: ..yelp_id=12345 -> { yelp_id: 12345 }
export function parseQueryParams(queryString) {
  return qs.parse(queryString);
}

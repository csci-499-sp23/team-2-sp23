import axios from "axios";
import { RestaurantAttributes } from "../models/Restaurant";
import { YelpRestaurant, yelpRestaurantParser } from "./yelp-utils";
import { OPTIMAL_SEARCH_RADIUS } from "./constants";
import config from "config";

const yelpAPI = axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    common: { Authorization: `Bearer ${config.get("api_keys.yelp")}` },
  },
});

interface YelpResponse {
  businesses: YelpRestaurant[];
  total: number;
  region: {
    center: Coordinates;
  };
}

export async function fetchRestaurants(
  coordinates: Coordinates
): Promise<RestaurantAttributes[]> {
  try {
    const response: YelpResponse = await yelpAPI
      .get("/search", {
        params: {
          longitude: coordinates.longitude,
          latitude: coordinates.latitude,
          term: "food",
          radius: OPTIMAL_SEARCH_RADIUS,
          limit: 50,
          sort_by: "distance",
        },
      })
      .then((res) => res.data);

    const parsedRestaurants = response.businesses.map((restaurant) =>
      yelpRestaurantParser(restaurant)
    );

    return parsedRestaurants;
  } catch (err) {
    console.error(err);
    return [];
  }
}

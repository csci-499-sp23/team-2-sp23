import axios from "axios";
import * as dotenv from "dotenv";
import { RestaurantAttributes } from "../models/Restaurant";
import { YelpRestaurant, yelpRestaurantParser } from "./yelp-utils";
dotenv.config();

const yelpAPI = axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    common: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
  },
});

// yelpAPI returns at most 50 restaurants per call.
// There is a page option, but the result appear inconsistent per query.
// We'll use a fixed search radius to get a rough 100% encapsulation for restaurants in a location.
const OPTIMAL_SEARCH_RADIUS = 269;

export type Coordinates = { longitude: number; latitude: number };
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

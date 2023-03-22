import { RestaurantAttributes } from "../models/Restaurant";

export interface YelpRestaurant {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: {
    alias: string;
    title: string;
  }[];
  rating: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  transactions: string[];
  price?: string;
  location: {
    address1: string | null;
    address2: string | null;
    address3: string | null;
    city: string;
    zip_code: string;
    country: string;
    state: string;
    display_address: string[];
  };
  phone: string;
  display_phone: string;
  distance: number;
}

export function yelpRestaurantParser(
  restaurant: YelpRestaurant
): RestaurantAttributes {
  const result: RestaurantAttributes = {
    yelp_id: restaurant.id,
    alias: restaurant.alias,
    name: restaurant.name,
    image_url: restaurant.image_url,
    yelp_url: restaurant.url.split("?")[0],
    food_categories: restaurant.categories.map((category) => category.title),
    rating: restaurant.rating,
    review_count: restaurant.review_count,
    location: {
      type: "Point",
      coordinates: [
        restaurant.coordinates.longitude,
        restaurant.coordinates.latitude,
      ],
    },
    transactions: restaurant.transactions,
    price_category: restaurant.price,
    address: restaurant.location,
    phone: restaurant.phone ?? "",
    display_phone: restaurant.display_phone ?? "",
  };

  return result;
}

export function randomNumberBetween(min: number, max: number) {
  const range = max - min;
  return Math.random() * range + min;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

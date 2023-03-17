import { ObjectId } from "mongoose";
import {
  RestaurantAttributes,
  RestaurantModel,
} from "../../../src/models/Restaurant";
import expect from "expect";

export async function generateRestaurantId(
  restaurant: RestaurantAttributes,
  extraProps?: any
): Promise<ObjectId> {
  return RestaurantModel.create({
    ...restaurant,
    ...extraProps,
    created_at: new Date(),
  }).then((restaurant) => restaurant._id)!;
}

export function expectRestaurantEquality(
  restaurantA: RestaurantAttributes,
  restaurantB: RestaurantAttributes
): void {
  expect(restaurantA.yelp_id).toBe(restaurantB.yelp_id);
  expect(restaurantA.alias).toBe(restaurantB.alias);
  expect(restaurantA.name).toBe(restaurantB.name);
  expect(restaurantA.image_url).toBe(restaurantB.image_url);
  expect(restaurantA.yelp_url).toBe(restaurantB.yelp_url);
  expect(restaurantA.review_count).toBe(restaurantB.review_count);
  expect(restaurantA.rating).toBe(restaurantB.rating);
  expect(restaurantA.price_category).toBe(restaurantB.price_category);
  expect(restaurantA.phone).toBe(restaurantB.phone);
  expect(restaurantA.display_phone).toBe(restaurantB.display_phone);

  expect(restaurantA.food_categories).toEqual(restaurantB.food_categories);
  expect(restaurantA.transactions).toEqual(restaurantB.transactions);
  expect(restaurantA.location).toEqual(restaurantB.location);
  expect(restaurantA.address).toEqual(restaurantB.address);
}
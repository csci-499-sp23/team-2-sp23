import RestaurantService from "../../../../src/services/restaurant";
import { testRestaurant } from "../../constants/restaurants";
import { expectRestaurantEquality } from "../utils";
import { expect } from "@jest/globals";

export async function createRestaurant() {
  const createdRestaurant = await RestaurantService.create(testRestaurant);
  expectRestaurantEquality(createdRestaurant!, testRestaurant);
  expect(createdRestaurant?.created_at).toBeDefined();
}

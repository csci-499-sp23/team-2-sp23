import {
  connectToDatabase,
  clearCollections,
  disconnectFromDatabase,
} from "../database";
import { test, beforeAll, afterAll, afterEach } from "@jest/globals";
import { createRestaurant } from "./tests/create";
import { testUpdateRestaurantMenu } from "./tests/update-menu";
import { testRetrieveNearbyRestaurants } from "./tests/retrieve-nearby";
import { testRetrieveNearbyRestaurantsInBudget } from "./tests/retrieve-nearby-budget";

beforeAll(async () => {
  await connectToDatabase();
});

afterEach(async () => {
  await clearCollections();
});

afterAll(async () => {
  await disconnectFromDatabase();
});

test("Creates a restaurant", async () => {
  await createRestaurant();
});

test("Updates a restaurant's menu", async () => {
  await testUpdateRestaurantMenu();
});

test("Retrieves nearby restaurants", async () => {
  await testRetrieveNearbyRestaurants();
});

test("Retrieves nearby restaurants fitting budget", async () => {
  await testRetrieveNearbyRestaurantsInBudget();
});

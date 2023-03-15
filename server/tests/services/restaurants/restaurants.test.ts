import { MenuModel } from "../../../src/models/Menu";
import {
  RestaurantAttributes,
  RestaurantModel,
} from "../../../src/models/Restaurant";
import restaurant from "../../../src/services/restaurant";
import RestaurantService from "../../../src/services/restaurant";
import { connectToDatabase, resetDatabase } from "../database";
import { testMenu } from "../menus/constants";
import { testRestaurant, testRestaurants } from "./constants";
import { expectRestaurantEquality, generateRestaurantId } from "./utils";
import { expect, test, beforeAll, afterAll } from "@jest/globals";

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await resetDatabase();
});

test("Creates a restaurant", async () => {
  const createdRestaurant = await RestaurantService.create(testRestaurant);
  expectRestaurantEquality(createdRestaurant!, testRestaurant);
  expect(createdRestaurant?.created_at).toBeDefined();
});

test("Updates a restaurant's menu", async () => {
  const restaurantId = await generateRestaurantId(testRestaurant);

  const menuIdA = await MenuModel.create({
    ...testMenu,
    restaurant_id: restaurantId,
    created_at: new Date(),
  }).then((menu) => menu._id);

  const menuIdB = await MenuModel.create({
    ...testMenu,
    restaurant_id: restaurantId,
    created_at: new Date(),
  }).then((menu) => menu._id);

  // set restaurant to use menuA
  const restaurantWithMenuA = await RestaurantService.updateMenu(
    restaurantId,
    menuIdA
  );
  expect(restaurantWithMenuA?.menu_id).toStrictEqual(menuIdA);

  // set restaurant to use menuB
  const restaurantWithMenuB = await RestaurantService.updateMenu(
    restaurantId,
    menuIdB
  );
  expect(restaurantWithMenuB?.menu_id).toStrictEqual(menuIdB);

  // menuA should be deprecated
  const updatedMenuA = await MenuModel.findById(menuIdA);
  expect(updatedMenuA?.deprecated).toBe(true);
});

test("Looks for nearby restaurants", async () => {
  await RestaurantModel.insertMany(
    testRestaurants.map((restaurant) => ({
      ...restaurant,
      created_at: new Date(),
    }))
  );

  const nearbyRestaurants = await RestaurantService.findNear(
    [-74.00565, 40.74207],
    5000
  );

  expect(nearbyRestaurants!.length).toBe(5);
});

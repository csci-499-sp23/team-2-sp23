import MenuService from "../../../src/services/menu";
import { MenuDocument, MenuModel } from "../../../src/models/Menu";
import {
  connectToDatabase,
  clearCollections,
  disconnectFromDatabase,
} from "../database";
import { testMenu } from "../constants/menus";
import { testRestaurant } from "../constants/restaurants";
import { generateRestaurantId } from "../restaurants/utils";
import { expect, test, beforeAll, afterAll, afterEach } from "@jest/globals";
import { FoodDocument, FoodModel } from "../../../src/models/Food";
import { manyTestFoods } from "../constants/foods";
import { expectFoodEquality } from "../foods/tests/utils";
import { testCreateMenu } from "./tests/create";
import { testSetFoodsToMenu } from "./tests/set-foods";
import { testRetrieveFoodsFromMenu } from "./tests/retrieve-foods";
import { testMarkDeprecated } from "./tests/mark-deprecated";

beforeAll(async () => {
  await connectToDatabase();
});

afterEach(async () => {
  await clearCollections();
});

afterAll(async () => {
  await disconnectFromDatabase();
});

function expectInitialMenu(menu: MenuDocument): void {
  expect(menu.created_at).toBeTruthy();
  expect(menu.deprecated).toBe(false);
  expect(menu.foods).toEqual([]);
  expect(menu.restaurant_id).toBeTruthy();
}

test("Creates a menu", async () => {
  await testCreateMenu();
});

test("Assigns an array of foodIds into a menu", async () => {
  await testSetFoodsToMenu();
});

test("Retrieve all foods from menu", async () => {
  await testRetrieveFoodsFromMenu();
});

test("Marks a menu as deprecated", async () => {
  await testMarkDeprecated();
});

import MenuService from "../../../src/services/menu";
import { MenuDocument, MenuModel } from "../../../src/models/Menu";
import { connectToDatabase, resetDatabase } from "../database";
import { testMenu } from "./constants";
import { testRestaurant } from "../restaurants/constants";
import { generateRestaurantId } from "../restaurants/utils";
import { expect, test, beforeAll, afterAll } from "@jest/globals";
import {
  FoodDocument,
  FoodModel,
} from "../../../src/models/Food";
import { manyTestFoods } from "../foods/constants";
import { expectFoodEquality } from "../foods/utils";

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await resetDatabase();
});

function expectInitialMenu(menu: MenuDocument): void {
  expect(menu.created_at).toBeTruthy();
  expect(menu.deprecated).toBe(false);
  expect(menu.foods).toEqual([]);
  expect(menu.restaurant_id).toBeTruthy();
}

test("Creates a menu", async () => {
  const testRestaurantId = await generateRestaurantId(testRestaurant);
  const createdMenu = await MenuService.create({
    ...testMenu,
    restaurant_id: testRestaurantId,
  });

  expectInitialMenu(createdMenu!);
});

test("Assigns an array of foodIds into a menu", async () => {
  const testRestaurantId = await generateRestaurantId(testRestaurant);
  const createdMenu = await MenuModel.create({
    ...testMenu,
    restaurant_id: testRestaurantId,
    created_at: new Date(),
  });

  const validFoods = manyTestFoods.map((food) => ({
    ...food,
    restaurant_id: testRestaurantId,
    created_at: new Date(),
  }));

  const foodIds = await FoodModel.insertMany(validFoods).then((foods) =>
    foods.map((food) => food._id)
  );

  const updatedMenu = await MenuService.setFoods(createdMenu!._id, foodIds);
  expect(updatedMenu?.foods).toEqual(foodIds);
});

test("Retrieve all foods from menu", async () => {
  const testRestaurantId = await generateRestaurantId(testRestaurant);
  const someFoods = manyTestFoods.map((food) => ({
    ...food,
    restaurant_id: testRestaurantId,
    created_at: new Date(),
  }));

  const createdMenu = await MenuModel.create({
    ...testMenu,
    restaurant_id: testRestaurantId,
    created_at: new Date(),
  });

  const createdFoods: FoodDocument[] = await FoodModel.insertMany(someFoods);

  const updatedMenu = await MenuModel.findOneAndUpdate(
    { _id: createdMenu._id },
    { foods: createdFoods.map((food) => food._id) },
    { new: true }
  );

  expect(updatedMenu?.foods.length).toBe(someFoods.length);
  const retrievedFoods = await MenuService.getFoods(updatedMenu!._id);
  expect(retrievedFoods!.length).toBe(updatedMenu!.foods.length);

  retrievedFoods!.forEach((retrievedFood: FoodDocument, index) => {
    expectFoodEquality(retrievedFood, someFoods[index]);
  });
});

test("Flags a menu as deprecated", async () => {
  const testRestaurantId = await generateRestaurantId(testRestaurant);
  const createdMenu = await MenuModel.create({
    ...testMenu,
    restaurant_id: testRestaurantId,
    created_at: new Date(),
  });

  expectInitialMenu(createdMenu);
  const updatedMenu = await MenuService.markDeprecated(createdMenu._id);
  expect(updatedMenu!.deprecated).toBe(true);
});

import { ObjectId } from "mongoose";
import { singleTestFood, manyTestFoods, testRestaurant } from "./constants";
import {
  FoodModel,
  FoodDocument,
  FoodAttributes,
} from "../../../src/models/Food";
import {
  RestaurantAttributes,
  RestaurantModel,
} from "../../../src/models/Restaurant";
import FoodService from "../../../src/services/food";
import { expect, test, beforeAll, afterAll } from "@jest/globals";
import { connectToDatabase, resetDatabase } from "../database";

// expects two food objects to have the same values
function expectFoodEquality(
  foodA: FoodAttributes,
  foodB: FoodAttributes
): void {
  expect(foodA.name).toBe(foodB.name);
  expect(foodA.description).toBe(foodB.description);
  expect(foodA.price).toBe(foodB.price);
  expect(foodA.image_url).toBe(foodB.image_url);
}

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await resetDatabase();
});

async function generateRestaurantId(
  restaurant: RestaurantAttributes
): Promise<ObjectId> {
  return RestaurantModel.create({
    ...restaurant,
    created_at: new Date(),
  }).then((restaurant) => restaurant._id)!;
}

test("Creates a food", async () => {
  const restaurantId = await generateRestaurantId(testRestaurant);
  const testFoodWithRestaurantId = {
    ...singleTestFood,
    restaurant_id: restaurantId,
  };
  const createdFood = await FoodService.create(testFoodWithRestaurantId);

  expect(createdFood).toBeDefined();
  expect(createdFood.created_at).toBeDefined();
  expectFoodEquality(createdFood, testFoodWithRestaurantId);
});

test("Creates many foods", async () => {
  const restaurantId = await generateRestaurantId(testRestaurant);

  const testFoodsWithRestaurantId = manyTestFoods.map((food) => ({
    ...food,
    restaurant_id: restaurantId,
  }));
  const createdFoods: FoodDocument[] = await FoodService.createMany(
    testFoodsWithRestaurantId
  );
  // ensure creation
  expect(createdFoods.length).toBe(manyTestFoods.length);

  // ensure exact match
  createdFoods.forEach((createdFood, index) => {
    expect(createdFood.created_at).toBeDefined();
    expectFoodEquality(createdFood, testFoodsWithRestaurantId[index]);
  });

  // delete test documents
  const createdFoodsId = createdFoods.map((food) => food._id);
  await FoodModel.deleteMany({
    _id: { $in: createdFoodsId },
  });
});

test("Finds a food by ID", async () => {
  const restaurantId = await generateRestaurantId(testRestaurant);
  const createdFood: FoodDocument = await FoodModel.create({
    ...singleTestFood,
    restaurant_id: restaurantId,
    created_at: new Date(),
  });
  const createdFoodId = createdFood._id;

  const foundFood: FoodDocument | null = await FoodService.findFoodById(
    createdFoodId
  );

  // ensure retrieval
  expect(foundFood).toBeDefined();
  expect(foundFood!._id).toStrictEqual(createdFood._id);
  expect(foundFood!.created_at).toStrictEqual(createdFood.created_at);
  expectFoodEquality(foundFood!, createdFood);
});

test("Deletes a food by ID", async () => {
  const restaurantId = await generateRestaurantId(testRestaurant);
  const createdFood: FoodDocument = await FoodModel.create({
    ...singleTestFood,
    restaurant_id: restaurantId,
    created_at: new Date(),
  });

  const deleteCount = await FoodService.deleteFoodById(createdFood._id);
  expect(deleteCount).toBe(1);

  const foundCount = await FoodModel.countDocuments({ _id: createdFood._id });
  expect(foundCount).toBe(0);
});

test("Finds all foods that fit a budget", async () => {
  const BUDGET = 3;
  const budgetQuery = { price: { $lte: BUDGET } };

  const restaurantId = await generateRestaurantId(testRestaurant);

  const testFoodsWithRestaurantId = manyTestFoods.map((food) => ({
    ...food,
    restaurant_id: restaurantId,
    created_at: new Date(),
  }));

  // insert some food
  await FoodModel.insertMany(testFoodsWithRestaurantId);

  const foodsWithinBudget = await FoodModel.find(budgetQuery);
  const retrievedFoods = await FoodService.findAll(budgetQuery);

  expect(retrievedFoods.length).toBe(foodsWithinBudget.length);
  // ensure exact match
  retrievedFoods.forEach((retrievedFood, index) => {
    const expectedFood = foodsWithinBudget[index];

    expect(retrievedFood!._id).toStrictEqual(expectedFood._id);
    expect(retrievedFood!.created_at).toStrictEqual(expectedFood.created_at);
    expectFoodEquality(retrievedFood!, expectedFood);
  });
});

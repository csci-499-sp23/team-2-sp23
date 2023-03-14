import mongoose from "mongoose";
import { singleTestFood, manyTestFoods } from "./constants";
import {
  FoodModel,
  FoodDocument,
  FoodAttributes,
} from "../../../src/models/Food";
import FoodService from "../../../src/services/food";
import { expect, test, beforeAll, afterAll } from "@jest/globals";

import * as dotenv from "dotenv";
dotenv.config();

const CONNECT_SUCCESS = "Connected to MongoDB";
async function connectToDB(): Promise<string> {
  return mongoose
    .connect(process.env.CONNECTION_URL_TEST!)
    .then(() => CONNECT_SUCCESS);
}

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
  const connectionResult = await connectToDB();
  expect(connectionResult).toBe(CONNECT_SUCCESS);
});

afterAll(async () => {
  mongoose.connection.close();
});

test("Creates a food", async () => {
  const createdFood = await FoodService.create(singleTestFood);

  expect(createdFood).toBeDefined();
  expect(createdFood.created_at).toBeDefined();
  expectFoodEquality(createdFood, singleTestFood);

  // delete test document
  if (!!createdFood) {
    await FoodModel.deleteOne({ _id: createdFood._id });
  }
});

test("Creates many foods", async () => {
  const createdFoods: FoodDocument[] = await FoodService.createMany(
    manyTestFoods
  );
  // ensure creation
  expect(createdFoods.length).toBe(manyTestFoods.length);

  // ensure exact match
  createdFoods.forEach((createdFood, index) => {
    expect(createdFood.created_at).toBeDefined();
    expectFoodEquality(createdFood, manyTestFoods[index]);
  });

  // delete test documents
  const createdFoodsId = createdFoods.map((food) => food._id);
  await FoodModel.deleteMany({
    _id: { $in: createdFoodsId },
  });
});

test("Finds a food by ID", async () => {
  const createdFood: FoodDocument = await FoodModel.create({
    ...singleTestFood,
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

  // delete test document
  if (!!createdFood) {
    await FoodModel.deleteOne({ _id: createdFoodId });
  }
});

test("Deletes a food by ID", async () => {
  const createdFood: FoodDocument = await FoodModel.create({
    ...singleTestFood,
    created_at: new Date(),
  });

  const deleteCount = await FoodService.deleteFoodById(createdFood._id);
  expect(deleteCount).toBe(1);

  const foundCount = await FoodModel.countDocuments({ _id: createdFood._id });
  expect(foundCount).toBe(0);
});

test("Finds all foods that fit a budget", async () => {
  const BUDGET = 17;
  const budgetQuery = { price: { $lte: BUDGET } };

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

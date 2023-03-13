import mongoose from "mongoose";
import { singleTestFood, foodKeys, manyTestFoods } from "./constants";
import { FoodModel, FoodDocument } from "../../../src/models/Food";
import FoodService from "../../../src/services/food";
import { expect, test } from "@jest/globals";
import { pick } from "lodash";

import * as dotenv from "dotenv";
dotenv.config();

const CONNECT_SUCCESS = "Connected to MongoDB";
async function connectToDB(): Promise<string> {
  return mongoose
    .connect(process.env.CONNECTION_URL!)
    .then(() => CONNECT_SUCCESS);
}

test("Connects to MongoDB", async () => {
  const connectionResult = await connectToDB();
  expect(connectionResult).toBe(CONNECT_SUCCESS);
});

test("Creates a food", async () => {
  const createdFood = await FoodService.create(singleTestFood);
  // ensure not null
  expect(createdFood).toBeDefined();
  // ensure input match
  expect(pick(createdFood, foodKeys)).toStrictEqual(singleTestFood);
  // ensure date not null
  expect(createdFood.created_at).toBeDefined();

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

  createdFoods.forEach((createdFood, index) => {
    // ensure equality
    expect(pick(createdFood, foodKeys)).toStrictEqual(manyTestFoods[index]);
    // ensure date
    expect(createdFood.created_at).toBeDefined();
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

  // ensure not null
  expect(foundFood).toBeDefined();
  // ensure input match
  expect(JSON.stringify(foundFood)).toBe(JSON.stringify(createdFood));

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
  const foundCount: number = await FoodModel.countDocuments({
    _id: createdFood._id,
  });

  expect(foundCount).toBe(0);
});

test("Finds all foods that fit a budget", async () => {
  const BUDGET = 17;
  const budgetQuery = { price: { $lte: BUDGET } };

  const foodsWithinBudget = await FoodModel.find(budgetQuery);
  const retrievedFoods = await FoodService.findAll(budgetQuery);

  expect(retrievedFoods.length).toBe(foodsWithinBudget.length);
  retrievedFoods.forEach((retrievedFood, index) => {
    // ensure equality
    expect(retrievedFood).toStrictEqual(foodsWithinBudget[index]);
  });
});

import { test, beforeAll, afterAll, afterEach } from "@jest/globals";
import {
  clearCollections,
  connectToDatabase,
  disconnectFromDatabase,
} from "../database";
import { testCreateFood } from "./tests/create";
import { testInsertManyFoods } from "./tests/insert-many";
import { testGetFoodById } from "./tests/find-by-id";
import { deleteFoodById } from "./tests/delete-by-id";
import { findFoodsWithinBudget } from "./tests/find-by-budget";

beforeAll(async () => {
  await connectToDatabase();
});

afterEach(async () => {
  await clearCollections();
});

afterAll(async () => {
  await disconnectFromDatabase();
});

test("Creates a food", async () => {
  await testCreateFood();
});

test("Creates many foods", async () => {
  await testInsertManyFoods();
});

test("Finds a food by ID", async () => {
  await testGetFoodById();
});

test("Deletes a food by ID", async () => {
  await deleteFoodById();
});

test("Finds all foods that fit a budget", async () => {
  await findFoodsWithinBudget();
});

import {
  connectToDatabase,
  clearCollections,
  disconnectFromDatabase,
} from "../database";
import { test, beforeAll, afterAll, afterEach } from "@jest/globals";
import { testCreateMenu } from "./tests/create";
import { testSetFoodsToMenu } from "./tests/set-foods";
import { testRetrieveFoodsFromMenu } from "./tests/retrieve-foods";
import { testMarkDeprecated } from "./tests/mark-deprecated";
import { testDeleteDeprecated } from "./tests/delete-deprecated";

beforeAll(async () => {
  await connectToDatabase();
});

afterEach(async () => {
  await clearCollections();
});

afterAll(async () => {
  await disconnectFromDatabase();
});

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

test("Deletes deprecated menus", async () => {
  await testDeleteDeprecated();
});

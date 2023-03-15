import mongoose from "mongoose";
import { FoodModel } from "../../src/models/Food";
import { RestaurantModel } from "../../src/models/Restaurant";
import { MenuModel } from "../../src/models/Menu";
import { expect } from "@jest/globals";

import * as dotenv from "dotenv";
dotenv.config();

const EXPECTED_DB_FOLDER = "tests";
const [databaseFolder]: string[] = process.env
  .CONNECTION_URL_TEST!.split("/")
  .slice(-1);

export async function connectToDatabase(): Promise<void> {
  expect(databaseFolder).toBe(EXPECTED_DB_FOLDER);
  await mongoose.connect(process.env.CONNECTION_URL_TEST!);
}

export async function resetDatabase(): Promise<void> {
  expect(databaseFolder).toBe(EXPECTED_DB_FOLDER);

  await FoodModel.deleteMany();
  await MenuModel.deleteMany();
  await RestaurantModel.deleteMany();
  await mongoose.connection.close();
}

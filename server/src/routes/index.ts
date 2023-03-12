import { Express } from "express";
import listEndpoints from "express-list-endpoints";
import ExampleRouter from "./example";
import FoodRouter from "./food";
import FoodService from "../services/food";
import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

async function generateRoutes(app: Express): Promise<void> {
  app.use("/example", ExampleRouter);
  app.use("/food", FoodRouter);

  mongoose
    .connect(process.env.CONNECTION_URL!)
    .then(async () => {
      console.log("Successfully Connected To MongoDB");
      // const foods = await FoodService.findAll({ name: "Sphagetti" });
      // console.log(foods);

      // console.log("hello");

      // const foodID = await FoodService.findFoodById("640bb8fd2b1325c94237be15");
      // console.log(foodID);
    })
    .catch(console.error);
  console.table(listEndpoints(app));
}

export default generateRoutes;

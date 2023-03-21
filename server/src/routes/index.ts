import { Express } from "express";
import { warCrimes } from "../yelp-services/war-crimes";
import ExampleRouter from "./example";
import RestaurantRouter from "./restaurant";
import listEndpoints from "express-list-endpoints";
import Models from "../models";

import * as dotenv from "dotenv";
dotenv.config();

async function generateRoutes(app: Express): Promise<void> {
  app.use("/example", ExampleRouter);
  app.use("/restaurant", RestaurantRouter);
  app.get("/war-crimes", async (req, res) => {
    const result = await warCrimes();
    res.status(200).json(result);
  });

  Models.mongoose
    .connect(process.env.CONNECTION_URL!)
    .then(() => {
      console.log("Successfully Connected To MongoDB");
    })
    .catch(console.error);
  console.table(listEndpoints(app));
}

export default generateRoutes;

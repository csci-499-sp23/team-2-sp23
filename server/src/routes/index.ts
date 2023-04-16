import { Express } from "express";
import ExampleRouter from "./example";
import RestaurantRouter from "./restaurant";
import listEndpoints from "express-list-endpoints";
import Models from "../models";
import config from "config";

async function generateRoutes(app: Express): Promise<void> {
  app.use("/example", ExampleRouter);
  app.use("/restaurant", RestaurantRouter);

  Models.mongoose
    .connect(config.get("database.production_url"))
    .then(() => {
      console.log("Successfully Connected To MongoDB");
    })
    .catch(console.error);

  console.table(listEndpoints(app));
}

export default generateRoutes;

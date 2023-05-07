import { Express } from "express";
import RestaurantRouter from "./restaurant";
import UserRouter from "./user";
import listEndpoints from "express-list-endpoints";
import Models from "../models";

import * as dotenv from "dotenv";
dotenv.config();

async function generateRoutes(app: Express): Promise<void> {
  app.use("/restaurant", RestaurantRouter);
  app.use("/user", UserRouter);

  Models.mongoose
    .connect(process.env.CONNECTION_URL!)
    .then(() => {
      console.log("Successfully Connected To MongoDB");
    })
    .catch(console.error);
  console.table(listEndpoints(app));
}

export default generateRoutes;

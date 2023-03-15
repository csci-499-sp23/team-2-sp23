import { Express } from "express";
import ExampleRouter from "./example";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

import * as dotenv from "dotenv";
import { warCrimes } from "../controllers/war-crimes";
dotenv.config();

async function generateRoutes(app: Express): Promise<void> {
  app.use("/example", ExampleRouter);
  app.get("/scrape", warCrimes);

  mongoose
    .connect(process.env.CONNECTION_URL!)
    .then(() => {
      console.log("Successfully Connected To MongoDB");
    })
    .catch(console.error);
  console.table(listEndpoints(app));
}

export default generateRoutes;

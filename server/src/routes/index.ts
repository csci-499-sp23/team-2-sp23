import { Express } from "express";
import listEndpoints from "express-list-endpoints";
import ExampleRouter from "./example";
import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

async function generateRoutes(app: Express): Promise<void> {
  app.use("/example", ExampleRouter);
  mongoose
    .connect(process.env.CONNECTION_URL!)
    .then(() => {
      console.log("Successfully Connected To MongoDB");
    })
    .catch(console.error);
  console.table(listEndpoints(app));
}

export default generateRoutes;

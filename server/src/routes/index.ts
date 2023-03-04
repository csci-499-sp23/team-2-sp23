import { Express } from "express";
import listEndpoints from "express-list-endpoints";
import ExampleRouter from "./example";

async function generateRoutes(app: Express): Promise<void> {
  app.use("/example", ExampleRouter);

  console.table(listEndpoints(app));
}

export default generateRoutes;

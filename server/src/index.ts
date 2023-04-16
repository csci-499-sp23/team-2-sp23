import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import generateRoutes from "./routes";
import scheduleJobs from "./jobs";
import config from "config";

// Singleton app for handling server requests
const app = express();

// Allow requests from anywhere
app.use(cors({ origin: "*" }));

// Ability to read request body
app.use(bodyParser.json());

const port = config.get("server.url") || 3001;

// Start server
app.listen(port, () => {
  console.log("Server listening at port", port);
  console.log(`Test apis with http://localhost:${port}/`);
});

generateRoutes(app);
scheduleJobs();

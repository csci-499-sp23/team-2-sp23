import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import generateRoutes from "./routes";
dotenv.config();

// Singleton app for handling server requests
const app = express();

// Allow requests from anywhere
app.use(cors({ origin: "*" }));

// Ability to read request body
app.use(bodyParser.json());

// default port to 3001. (http://localhost:3001/)
const port = process.env.PORT || 3001;

// Start server
app.listen(port, async () => {
  console.log("Server listening at port", port);
  console.log(`Test apis with http://localhost:${port}/`);
});

generateRoutes(app);

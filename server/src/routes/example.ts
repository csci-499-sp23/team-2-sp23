import express from "express";
import ExampleController from "../controllers/example";

const router = express.Router();

router.get("/get", ExampleController.getCash, ExampleController.presentCash);
router.post("/add", ExampleController.addCash, ExampleController.presentCash);

export default router;

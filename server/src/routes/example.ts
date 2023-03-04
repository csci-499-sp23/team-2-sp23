import express from "express";
import ExampleController from "../controllers/example";

const router = express.Router();

router.post("/get", ExampleController.addCash, ExampleController.presentCash);
router.post("/add", ExampleController.addCash, ExampleController.presentCash);

export default router;

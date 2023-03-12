import { Request, Response } from "express";
import FoodService from "../services/food";

export async function create(request: Request, response: Response) {
  try {
    const food = request.body.food;
    const createdFood = await FoodService.create(food);
    response.status(201);
    response.json({ food: createdFood });
  } catch (error) {
    response.status(400);
    response.json(error);
  }
}

export async function createMany(request: Request, response: Response) {
  try {
    const foods = request.body.foods;
    const createdFoods = await FoodService.createMany(foods);
    response.status(201);
    response.json({ foods: createdFoods });
  } catch (error) {
    response.status(400);
    response.json(error);
  }
}

export async function deleteFoodById(request: Request, response: Response) {
  try {
    const foodID = request.body.foodID;
    const deletedFood = await FoodService.deleteFoodById(foodID);
    response.status(200);
  } catch (error) {
    response.status(400);
    response.json(error);
  }
}

export async function findAll(request: Request, response: Response) {
  try {
    const query_parameter = request.body.query_parameter;
    const foundFoods = await FoodService.findAll(query_parameter);
    response.status(200);
    response.json({ foundFoods });
  } catch (error) {
    response.status(400);
    response.json(error);
  }
}

export async function findFoodById(request: Request, response: Response) {
  try {
    const foodId = request.body.foodId;
    const foundFood = await FoodService.findFoodById(foodId);
    response.status(200);
    response.json({ foundFood });
  } catch (error) {
    response.status(400);
    response.json(error);
  }
}

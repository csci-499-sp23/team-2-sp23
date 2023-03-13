import mongoose, { ObjectId } from "mongoose";
import { FoodModel } from "../models/Food";

// Create a single new food item
async function create(food: FoodAttributes): Promise<FoodAttributes> {
  return FoodModel.create(food);
}

// Creates many food items
async function createMany(foods: FoodAttributes[]): Promise<FoodAttributes[]> {
  return FoodModel.insertMany(foods);
}

// Delete a single food item by an id
async function deleteFoodById(foodId: ObjectId): Promise<number> {
  const deletedCount = await FoodModel.deleteOne(foodId).then(
    (res) => res.deletedCount
  );
  
  return deletedCount;
}

// Find all foods that match the given query
async function findAll(query: any): Promise<FoodAttributes[]> {
  return FoodModel.find(query);
}

// Find a single food by an id
async function findFoodById(foodId: any): Promise<FoodAttributes | null> {
  return FoodModel.findById(foodId);
}

export default {
  create,
  createMany,
  deleteFoodById,
  findAll,
  findFoodById,
};

import { ObjectId } from "mongoose";
import { FoodModel, FoodAttributes, FoodDocument } from "../models/Food";

// Create a single new food item
async function create(food: FoodAttributes): Promise<FoodDocument> {
  return FoodModel.create({
    ...food,
    created_at: new Date(),
  });
}

// Creates many food items
async function createMany(foods: FoodAttributes[]): Promise<FoodDocument[]> {
  return FoodModel.insertMany(
    foods.map((food) => ({
      ...food,
      created_at: new Date(),
    }))
  );
}

// Delete a single food item by an id
async function deleteFoodById(foodId: ObjectId): Promise<number> {
  const deletedCount = await FoodModel.deleteOne(foodId).then(
    (res) => res.deletedCount
  );

  return deletedCount;
}

// Find all foods that match the given query
async function findAll(query: any): Promise<FoodDocument[]> {
  return FoodModel.find(query);
}

// Find a single food by an id
async function findFoodById(foodId: any): Promise<FoodDocument | null> {
  return FoodModel.findById(foodId);
}

export default {
  create,
  createMany,
  deleteFoodById,
  findAll,
  findFoodById,
};

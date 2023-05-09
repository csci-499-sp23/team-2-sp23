import { ObjectId } from "mongoose";
import { UserAttributes, UserModel } from "../models/User";
import { RestaurantModel } from "../models/Restaurant";

async function findOne(query: any): Promise<UserAttributes | null> {
  return await UserModel.findOne(query);
}

async function create(auth0Id: string): Promise<UserAttributes> {
  return UserModel.create({
    auth0_id: auth0Id,
    created_at: new Date(),
  });
}

async function exists(query: any): Promise<boolean> {
  const userExists = !!(await UserModel.count(query));
  return userExists;
}

async function saveRestaurant(
  userId: ObjectId,
  restaurantId: ObjectId
): Promise<UserAttributes | null> {
  const foundRestaurant = RestaurantModel.findById(restaurantId);
  if (foundRestaurant === null) return null;

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { saved_restaurants: restaurantId } },
    { new: true }
  );

  return updatedUser;
}

async function unsaveRestaurant(
  userId: ObjectId,
  restaurantId: ObjectId
): Promise<UserAttributes | null> {
  const foundRestaurant = RestaurantModel.findById(restaurantId);
  if (foundRestaurant === null) return null;

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: userId },
    { $pull: { saved_restaurants: restaurantId } },
    { new: true }
  );

  return updatedUser;
}

async function userProfile(userId: ObjectId) {
  return await UserModel.findById(userId).populate("saved_restaurants");
}

const UserService = {
  findOne,
  create,
  exists,
  saveRestaurant,
  unsaveRestaurant,
  userProfile,
};

export default UserService;

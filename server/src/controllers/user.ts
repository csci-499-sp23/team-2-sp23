import { Request, Response } from "express";
import UserService from "../services/users";
import { ObjectId } from "mongoose";

async function createUser(request: Request, response: Response): Promise<void> {
  try {
    const auth0Id = request.body.auth0_id;
    const userExists = await UserService.exists({ auth0_id: auth0Id });

    if (!userExists) {
      await UserService.create(auth0Id);
    }
    const foundUser = await UserService.findOne({ auth0_id: auth0Id });

    response.status(201).json(foundUser);
  } catch (error: any) {
    response.status(401).json(error.toString());
  }
}

async function findUser(request: Request, response: Response): Promise<void> {
  try {
    const userId = request.params.id;
    const foundUser = await UserService.findOne({ _id: userId });

    if (foundUser === null) response.status(404).json(foundUser);
    else response.status(200).json(foundUser);
  } catch (error: any) {
    response.status(404).json(error.toString());
  }
}

async function saveRestaurant(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const userId = request.body.user_id;
    const restaurantId = request.body.restaurant_id;

    const updatedUser = await UserService.saveRestaurant(userId, restaurantId);

    response.status(200).json(updatedUser);
  } catch (error: any) {
    response.status(404).json(error.toString());
  }
}

async function unsaveRestaurant(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const userId = request.body.user_id;
    const restaurantId = request.body.restaurant_id;

    const updatedUser = await UserService.unsaveRestaurant(
      userId,
      restaurantId
    );

    response.status(200).json(updatedUser);
  } catch (error: any) {
    response.status(404).json(error.toString());
  }
}

async function userProfile(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const userId: unknown = request.params.id;
    const foundUser = await UserService.userProfile(userId as ObjectId);

    if (foundUser === null) response.status(404).json(null);
    else response.status(200).json(foundUser);
  } catch (error: any) {
    response.status(404).json(error.toString());
  }
}

const UserController = {
  findUser,
  createUser,
  saveRestaurant,
  unsaveRestaurant,
  userProfile,
};

export default UserController;

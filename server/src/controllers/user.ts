import { Request, Response } from "express";
import UserService from "../services/users";

async function createUser(request: Request, response: Response): Promise<void> {
  try {
    const auth0Id = request.body.auth0_id;
    const userExists = await UserService.exists(auth0Id);

    if (!userExists) {
      await UserService.create(auth0Id);
    }
    const foundUser = await UserService.getUserByAuth0Id(auth0Id);
    
    response.status(201).json(foundUser);
  } catch (error: any) {
    response.status(401).json(error.toString());
  }
}

async function findUser(request: Request, response: Response): Promise<void> {
  try {
    const auth0Id = request.params.id;
    const foundUser = await UserService.getUserByAuth0Id(auth0Id);

    if (foundUser === null) response.status(404).json(foundUser);
    else response.status(200).json(foundUser);
  } catch (error: any) {
    response.status(404).json(error.toString());
  }
}

const UserController = {
  findUser,
  createUser,
};

export default UserController;

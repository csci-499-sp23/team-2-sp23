import { Request, Response } from "express";
import UserService from "../services/users";

async function findUser(request: Request, response: Response): Promise<void> {
  try {
    const auth0Id = request.params.id;
    const foundUser = await UserService.getUserByAuth0Id(auth0Id);
    
    response.status(200).json(foundUser);
  } catch (error: any) {
    response.status(404).json(error.toString());
  }
}

const UserController = {
  findUser,
};

export default UserController;

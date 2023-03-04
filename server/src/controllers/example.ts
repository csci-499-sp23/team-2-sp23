import { Request, Response, NextFunction } from "express";
import ExampleService from "../services/example";

async function getCash(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const currentCash = await ExampleService.getCash().catch(next);
  request.body = currentCash; // store cash in request.body, to be read later

  return next();
}

/* POST with { "cash": 1000 } */
async function addCash(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const cashInput = request.body["cash"];
  const updatedCash = await ExampleService.addCash(cashInput).catch(next);
  request.body = updatedCash; // store cash in request.body, to be read later

  return next();
}

/* Present the updated cash value to API response */
function presentCash(request: Request, response: Response): void {
  response.status(200);
  response.json({
    cash: request.body,
  });
}

export default {
  getCash,
  addCash,
  presentCash,
};

import { Request, Response } from "express";
import RestaurantService from "../services/restaurant";

async function findNearbyRestaurants(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const latitude: number = parseFloat(request.query.latitude as string);
    const longitude: number = parseFloat(request.query.longitude as string);
    const meters: number = parseInt(request.query.meters as string);
    const restaurants = await RestaurantService.findNear(
      [longitude, latitude],
      meters
    );

    response.status(200).json({
      count: restaurants!.length,
      rows: restaurants,
    });
  } catch (error) {
    response.status(500).json(error);
  }
}

export default {
  findNearbyRestaurants,
};

import { Request, Response } from "express";
import PreferenceService from "../services/preference";

async function create(request: Request, response: Response): Promise<void> {
  try {
    const preference = request.body;
    const createdPreference = await PreferenceService.create(preference);
    response.status(200).json(createdPreference);
  } catch (error) {
    response.status(500).json(error);
  }
}

const PreferenceController = {
  create,
};

export default PreferenceController;
;
import { PreferenceAttributes, PreferenceModel } from "../models/Perference";

async function create(
  preference: PreferenceAttributes
): Promise<PreferenceAttributes> {
  return PreferenceModel.create(preference);
}

const PreferenceService = {
  create,
};

export default PreferenceService;

import ExampleModel from "../models/Example";

// extended functions using built in "database queries"
async function addCash(value: number): Promise<number> {
  const currentCash = await ExampleModel.getCash();
  return ExampleModel.setCash(currentCash + value);
}

async function removeCash(value: number): Promise<number> {
  const currentCash = await ExampleModel.getCash();
  return ExampleModel.setCash(currentCash - value);
}

async function getCash(): Promise<number> {
  return ExampleModel.getCash();
}

export default {
  addCash,
  removeCash,
  getCash,
};

import ExampleModel from "../models/Example";

// extended functions using built in "database queries"
async function addCash(value: number): Promise<number> {
  const currentCash = await ExampleModel.getCashQuery();
  return ExampleModel.setCashQuery(currentCash + value);
}

async function removeCash(value: number): Promise<number> {
  const currentCash = await ExampleModel.getCashQuery();
  return ExampleModel.setCashQuery(currentCash - value);
}

async function getCash(): Promise<number> {
  return ExampleModel.getCashQuery();
}

export default {
  addCash,
  removeCash,
  getCash,
};

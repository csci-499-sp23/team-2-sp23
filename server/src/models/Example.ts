// Mock database info
let cash = 0;

const QUERY_DELAY_MS = 200;
// mock database request wait time
async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Simulate cash modification
async function setCash(val: number): Promise<any> {
  await sleep(QUERY_DELAY_MS);
  cash = val;

  return cash;
}

// Simulate cash retrieval
async function getCash(): Promise<any> {
  await sleep(QUERY_DELAY_MS);
  return cash;
}

export default {
  setCash,
  getCash,
};

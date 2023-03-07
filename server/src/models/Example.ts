// Mock database info
let cash = 0;

// mock database request wait time
async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const QUERY_DELAY_MS = 200;
// Simulate cash modification
async function setCashQuery(val: number): Promise<any> {
  await sleep(QUERY_DELAY_MS);
  cash = val;

  return cash;
}

// Simulate cash retrieval
async function getCashQuery(): Promise<any> {
  await sleep(QUERY_DELAY_MS);
  return cash;
}

export default {
  setCashQuery,
  getCashQuery,
};

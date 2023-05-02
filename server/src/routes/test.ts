import express from "express";
import { Request, Response } from "express";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// An O(N^2) algorithm for measuring performance
// TwoSum: Determines if there exists a pair of numbers that sum up to target
function TwoSum(nums: number[], target: number): boolean {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return true;
    }
  }

  return false;
}

const router = express.Router();
const numbers = [...Array(50000).fill(0), 1, 1];

router.get("/traffic", async (request: Request, response: Response) => {
  const sleepTime = 200;
  await sleep(sleepTime);
  response.status(200).json("done");
});

router.get("/performance", async (request: Request, response: Response) => {
  // [0,0,0,0,0,0,0, ... ,1,1]
  const existsPair = TwoSum(numbers, 2);
  response.status(200).json(existsPair);
});

export default router;

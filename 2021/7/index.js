import fs from "fs";
import readline from "readline";

const fileStream = fs.createReadStream("input.txt");

const processFile = async () => {
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    var crabs = line.split(",").map(val=>parseInt(val));
  }
  return crabs;
};

let crabs = await processFile();

let maxPos = Math.max(...crabs);
let minPos = Math.min(...crabs);

let minCost = Infinity;

for (let x = minPos; x <= maxPos; x++){
  minCost = Math.min(minCost, crabs.reduce((prev, cur) => prev + calculateCost(Math.abs(cur-x)), 0));
}

console.log(minCost);

function calculateCost(num){
  let count = 0;
  for (let x = 1; x <= num; x++){
    count += x;
  }
  return count;
}
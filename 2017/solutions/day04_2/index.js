import { sort } from 'mathjs';

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map(row=>row.split(" "));
};

const calculateSolution = (input) => {
  let validCount = 0;
  for (let row of input) {
    for (let wordIndex in row) {
      row[wordIndex] = row[wordIndex].split("").sort().join("");
    }
    row.length === new Set(row).size && validCount++;
  }
  return validCount
};

export default solution;

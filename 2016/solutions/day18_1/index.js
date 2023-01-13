import { row } from "mathjs";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("");
};

const calculateSolution = (input) => {
  const rows = [input];
  while (rows.length < 40) {
    const prevRow = rows.slice(-1)[0];
    const newRow = [];
    for (let x = 0; x < prevRow.length; x++) {
      const leftSafe = x === 0 || prevRow[x - 1] === ".";
      const rightSafe = x === prevRow.length - 1 || prevRow[x + 1] === ".";
      newRow.push(leftSafe != rightSafe ? "^" : ".");
    }
    rows.push(newRow);
  }
  return rows.flat().reduce((acc, curr) => acc + (curr === "." ? 1 : 0), 0);
};

export default solution;

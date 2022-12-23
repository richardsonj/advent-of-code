import { parse } from "mathjs";

const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) =>
  input
    .split("\n")
    .map((row) => row.split(",").map((elf) => elf.split("-").map((num) => parseInt(num))));

const calculateSolution = (input) => {
  let count = 0;
  for (const row of input) {
    const elf1 = row[0];
    const elf2 = row[1];
    if ((elf1[0] <= elf2[0] && elf1[1] >= elf2[1]) || (elf1[0] >= elf2[0] && elf1[1] <= elf2[1])) {
      count += 1;
    }
  }
  return count;
};

export default solution;

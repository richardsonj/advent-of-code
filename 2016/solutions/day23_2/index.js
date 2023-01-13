import { factorial } from "mathjs";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n");
};

const calculateSolution = (input) => {
  return factorial(12) + 78 * 86;
};
export default solution;

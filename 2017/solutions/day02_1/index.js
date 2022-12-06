const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((row) => row.split("\t").map(char=>parseInt(char)));
};

const calculateSolution = (input) => {
  return input.reduce(
    (acc, curr) => Math.max(...curr) - Math.min(...curr) + acc,
    0
  );
};

export default solution;

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map(val=>parseInt(val));
};

const calculateSolution = (input) => {
  let index = 0;
  let count = 0;
  while (index >= 0 && index < input.length) {
    input[index]++;
    index += input[index]-1;
    count++;
  }
  return count;
};

export default solution;

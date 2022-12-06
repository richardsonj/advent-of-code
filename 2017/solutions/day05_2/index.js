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
    const newIndex = index + input[index];
    index += input[index] >= 3 ? input[index]-- : input[index]++;
    count++;
    index = newIndex;
  }
  return count;
};

export default solution;

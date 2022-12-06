const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input;
};

const calculateSolution = (input) => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === input[(i + 1) % input.length]){
      sum+=parseInt(input[i]);
    }
  }
  return sum;
};

export default solution;

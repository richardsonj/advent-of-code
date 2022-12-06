const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("");
};

const calculateSolution = (input) => {
  for (let x = 0; x < input.length-4; x++) {
    const slice = new Set(input.slice(x, x+4));
    if (slice.size === 4) {
      return x + 4;
    }
  }
};

export default solution;

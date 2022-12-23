const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) => input.split("");

const calculateSolution = (input) => {
  for (let x = 0; x < input.length - 14; x++) {
    const slice = new Set(input.slice(x, x + 14));
    if (slice.size === 14) {
      return x + 14;
    }
  }
};

export default solution;

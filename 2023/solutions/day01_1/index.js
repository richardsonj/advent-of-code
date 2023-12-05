const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => row.split(""));
};

const calculateSolution = (input) => {
  let total = 0;
  for (const row of input) {
    for (const c of row) {
      const val = +c;
      if (!Number.isNaN(val)) {
        total += val * 10;
        break;
      }
    }
    for (const c of row.reverse()) {
      const val = +c;
      if (!Number.isNaN(val)) {
        total += val;
        break;
      }
    }
  }
  return total;
};

export default solution;

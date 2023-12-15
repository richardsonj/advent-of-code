const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split(",");
};

const calculateSolution = (input) => {
  let total = 0;
  for (const item of input) {
    let current = 0;
    for (let x = 0; x < item.length; x++) {
      current += item.charCodeAt(x);
      current *= 17;
      current %= 256;
    }
    total += current;
  }
  return total;
};

export default solution;

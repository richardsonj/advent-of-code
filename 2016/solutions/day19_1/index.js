const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return parseInt(input);
};

const calculateSolution = (input) => {
  let elves = Object.keys(new Array(input).fill(0));
  let even = true;
  while (elves.length > 1) {
    const nextEven = elves.length % 2 === 1 ? !even : even;
    elves = elves.filter((_val, index) => index % 2 === (even ? 0 : 1));
    even = nextEven;
  }
  return parseInt(elves[0]) + 1;
};

export default solution;

const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) =>
  input.split("\n\n").map((elf) => elf.split("\n").map((num) => parseInt(num)));

const calculateSolution = (input) => {
  console.log(input);
  return input
    .reduce((acc, curr) => [...acc, curr.reduce((acc2, curr2) => acc2 + curr2)], [])
    .sort((a, b) => b - a)[0];
};

export default solution;

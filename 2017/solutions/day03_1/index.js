const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return parseInt(input);
};

const calculateSolution = (input) => {
  let square = 1;
  while (square * square < input) {
    square += 2;
  }
  let layerCount = square * square - (square - 2) * (square - 2);
  let side = layerCount / 4;
  let centers = [
    square * square - side / 2,
    square * square - side - side / 2,
    square * square - side * 2 - side / 2,
    square * square - side * 3 - side / 2,
  ];
  return side/2 + Math.min(...centers.map(val=>Math.abs(val-input)));
};

export default solution;

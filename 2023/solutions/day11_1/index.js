const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => row.split(""));
};

const calculateSolution = (input) => {
  for (let y = input.length - 1; y >= 0; y--) {
    if (input[y].every((chr) => chr === ".")) {
      input = [...input.slice(0, y + 1), input[y], ...input.slice(y + 1)];
    }
  }
  for (let x = input[0].length - 1; x >= 0; x--) {
    let next = false;
    for (let y = input.length - 1; y >= 0; y--) {
      if (input[y][x] !== ".") {
        next = true;
        break;
      }
    }
    if (next) {
      continue;
    }
    for (let y = input.length - 1; y >= 0; y--) {
      input[y] = [...input[y].slice(0, x + 1), input[y][x], ...input[y].slice(x + 1)];
    }
  }
  const galaxies = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === "#") {
        galaxies.push([y, x]);
      }
    }
  }
  let total = 0;
  for (let x = 0; x < galaxies.length - 1; x++) {
    for (let x2 = x + 1; x2 < galaxies.length; x2++) {
      total += manhattanDistance(galaxies[x], galaxies[x2]);
    }
  }
  return total;
};

const manhattanDistance = (left, right) =>
  Math.abs(left[0] - right[0]) + Math.abs(left[1] - right[1]);

export default solution;

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => row.split(""));
};

const calculateSolution = (input) => {
  const galaxies = [];
  const growth = 1000000;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === "#") {
        galaxies.push([y, x]);
      }
    }
  }
  for (let y = input.length - 1; y >= 0; y--) {
    if (input[y].every((chr) => chr === ".")) {
      for (const galaxy of galaxies) {
        if (galaxy[0] > y) {
          galaxy[0] += growth - 1;
        }
      }
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
    for (const galaxy of galaxies) {
      if (galaxy[1] > x) {
        galaxy[1] += growth - 1;
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

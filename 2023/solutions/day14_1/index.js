const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => row.split(""));
};

const calculateSolution = (input) => {
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === "O") {
        shiftRock(input, x, y);
      }
    }
  }
  return calculateLoad(input);
};

const shiftRock = (grid, x, y) => {
  for (let y2 = y - 1; y2 >= 0; y2--) {
    if (grid[y2][x] === "#" || grid[y2][x] === "O") return;

    grid[y2][x] = grid[y2 + 1][x];
    grid[y2 + 1][x] = ".";
  }
};

const calculateLoad = (grid) => {
  let total = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "O") {
        total += grid.length - y;
      }
    }
  }
  return total;
};

export default solution;

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n\n").map((grid) => grid.split("\n").map((row) => row.split("")));
};

const calculateSolution = (input) => {
  let total = 0;
  for (const grid of input) {
    const horzGrid = grid.map((row) => row.join(""));
    const vertGrid = [];
    for (let x = 0; x < grid[0].length; x++) {
      const row = [];
      for (let y = 0; y < grid.length; y++) {
        row.push(grid[y][x]);
      }
      vertGrid.push(row.join(""));
    }
    const horzReflection = getReflection(horzGrid);
    if (horzReflection) {
      total += 100 * horzReflection;
      continue;
    }

    const vertReflection = getReflection(vertGrid);
    if (vertReflection) {
      total += vertReflection;
    }
  }
  return total;
};

const getReflection = (grid) => {
  for (let x = 0; x < grid.length - 1; x++) {
    for (let offset = 0; offset <= Math.ceil((grid.length - 1 + x) / 2); offset++) {
      if (grid[x + offset] !== grid[grid.length - 1 - offset]) {
        break;
      }
      if (grid.length - 1 - offset - x - offset === 1) {
        return grid.length - 1 - offset;
      }
    }
  }
  for (let x = grid.length - 1; x > 0; x--) {
    for (let offset = 0; offset <= Math.floor(x / 2); offset++) {
      if (grid[offset] !== grid[x - offset]) {
        break;
      }
      if (x - offset - offset === 1) {
        return x - offset;
      }
    }
  }
  return 0;
};

export default solution;

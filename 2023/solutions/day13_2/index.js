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
    const vertGrid = transpose(horzGrid);
    const horzReflection = getReflection(horzGrid);
    if (horzReflection) {
      total += findReplacement(horzGrid, horzReflection, false);
      continue;
    }

    const vertReflection = getReflection(vertGrid);
    if (vertReflection) {
      total += findReplacement(vertGrid, vertReflection, true);
    }
  }
  return total;
};

const getReflection = (grid, reflection) => {
  for (let x = 0; x < grid.length - 1; x++) {
    for (let offset = 0; offset <= Math.ceil((grid.length - 1 + x) / 2); offset++) {
      if (grid[x + offset] !== grid[grid.length - 1 - offset]) {
        break;
      }
      if (grid.length - 1 - offset - x - offset === 1 && grid.length - 1 - offset !== reflection) {
        return grid.length - 1 - offset;
      }
    }
  }
  for (let x = grid.length - 1; x > 0; x--) {
    for (let offset = 0; offset <= Math.floor(x / 2); offset++) {
      if (grid[offset] !== grid[x - offset]) {
        break;
      }
      if (x - offset - offset === 1 && x - offset !== reflection) {
        return x - offset;
      }
    }
  }
  return 0;
};

function findReplacement(grid, reflection, flip) {
  for (let x = 0; x < grid.length; x++) {
    const oldRow = grid[x];
    const values = oldRow.split("");
    for (let y = 0; y < values.length; y++) {
      values[y] = values[y] === "#" ? "." : "#";
      grid[x] = values.join("");
      const newHorzReflection = getReflection(grid, reflection);
      if (newHorzReflection) {
        return flip ? newHorzReflection : newHorzReflection * 100;
      }
      const vertReflection = getReflection(transpose(grid));
      if (vertReflection) {
        return flip ? vertReflection * 100 : vertReflection;
      }
      values[y] = values[y] === "#" ? "." : "#";
      grid[x] = values.join("");
    }
  }
  return 0;
}

function transpose(grid) {
  const transposed = [];
  for (let x = 0; x < grid[0].length; x++) {
    const row = [];
    for (let y = 0; y < grid.length; y++) {
      row.push(grid[y].charAt(x));
    }
    transposed.push(row.join(""));
  }
  return transposed;
}

export default solution;

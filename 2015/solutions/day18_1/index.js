const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input
    .split("\r\n")
    .map((line) => line.split("").map((char) => char === "#"));
};

const calculateSolution = (grid) => {
  for (let x = 0; x < 100; x++) {
    grid = simulate(grid);
  }
  return grid.reduce(
    (acc, curr) =>
      acc + curr.reduce((acc2, curr2) => (acc2 + (curr2 ? 1 : 0)), 0),
    0
  );
};

const simulate = (grid) => {
  let newGrid = [];
  for (let x = 0; x < grid.length; x++) {
    let row = [];
    for (let y = 0; y < grid[x].length; y++) {
      let neighbors = [
        grid[x - 1]?.[y - 1],
        grid[x - 1]?.[y],
        grid[x - 1]?.[y + 1],
        grid[x]?.[y - 1],
        grid[x]?.[y + 1],
        grid[x + 1]?.[y - 1],
        grid[x + 1]?.[y],
        grid[x + 1]?.[y + 1],
      ].reduce((acc, curr) => (curr ? acc + 1 : acc), 0);
      row.push(
        (grid[x][y] && [2, 3].includes(neighbors)) ||
          (!grid[x][y] && neighbors === 3)
      );
    }
    newGrid.push(row);
  }
  return newGrid;
};

export default solution;

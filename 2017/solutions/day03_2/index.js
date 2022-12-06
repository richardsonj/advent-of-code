const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return parseInt(input);
};

const calculateSolution = (input) => {
  const width = 101;
  const grid = [];
  for (let x = 0; x < width; x++) {
    const row = [];
    for (let y = 0; y < width; y++) {
      row.push(0);
    }
    grid.push(row);
  }

  let pos = [(width - 1) / 2, (width - 1) / 2];
  grid[pos[0]][pos[1]] = 1;
  let step = 1;
  let count = 0;
  let stepsTaken = 0;
  const directions = [
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 0],
  ];
  let directionIndex = 0;

  let current = 1;
  while (current < input) {
    pos[0] += directions[directionIndex][0];
    pos[1] += directions[directionIndex][1];
    stepsTaken++;
    if (stepsTaken === step) {
      stepsTaken = 0;
      if (count) {
        count = 0;
        step += 1;
      } else {
        count = 1;
      }
      directionIndex++;
      directionIndex %= 4;
    }

    if (pos[0] >= width || pos[0] < 0 || pos[1] >= width || pos[1] < 0) {
      return NaN;
    }

    current = 0;
    current += grid[pos[0] + 1]?.[pos[1]] || 0;
    current += grid[pos[0] - 1]?.[pos[1]] || 0;
    current += grid[pos[0] + 1]?.[pos[1] + 1] || 0;
    current += grid[pos[0] - 1]?.[pos[1] + 1] || 0;
    current += grid[pos[0] + 1]?.[pos[1] - 1] || 0;
    current += grid[pos[0] - 1]?.[pos[1] - 1] || 0;
    current += grid[pos[0]]?.[pos[1] + 1] || 0;
    current += grid[pos[0]]?.[pos[1] - 1] || 0;

    grid[pos[0]][pos[1]] = current;
    //printGrid(grid);
  }

  return current;
};

const printGrid = (grid) => {
  console.log("------------------------");
  for (let row of grid) {
    console.log(row.join(" "));
  }
};

export default solution;

const day25_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => line.split(""));
};

const calculateSolution = (parsedInput) => {
  let turns = 1;
  let current = parsedInput;
  while (true) {
    let next = takeTurn(current);
    if (unchanged(current, next)) {
      return turns;
    }
    current = next;
    turns++;
  }
};

const takeTurn = (grid) => {
  let newGrid = grid.map((row) => row.map((val) => "."));
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === ">" && grid[x][(y + 1) % grid[x].length] === ".") {
        newGrid[x][(y + 1) % grid[x].length] = ">";
        y++;
      } else {
        newGrid[x][y] = grid[x][y];
      }
    }
  }

  let newGrid2 = newGrid.map((row) => row.map((val) => "."));

  for (let y = 0; y < grid[0].length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (newGrid[x][y] === "v" && newGrid[(x + 1) % grid.length][y] === ".") {
        newGrid2[(x + 1) % grid.length][y] = "v";
        x++;
      } else {
        newGrid2[x][y] = newGrid[x][y];
      }
    }
  }
  return newGrid2;
};

const unchanged = (current, next) => {
  for (let x = 0; x < current.length; x++) {
    for (let y = 0; y < current[x].length; y++) {
      if (current[x][y] !== next[x][y]) return false;
    }
  }
  return true;
};

export default day25_1;

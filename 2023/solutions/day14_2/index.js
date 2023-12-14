const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => row.split(""));
};

const calculateSolution = (input) => {
  const states = new Set();
  let targetState;
  let targetStateIndex;
  let cycleAdjusted = false;
  for (let x = 0; x < 1000000000; x++) {
    shiftRockNorth(input);
    shiftRockWest(input);
    shiftRockSouth(input);
    shiftRockEast(input);
    const stateString = stringify(input);
    if (cycleAdjusted) continue;
    if (!targetState) {
      if (states.has(stateString)) {
        targetState = stateString;
        targetStateIndex = x;
        continue;
      } else {
        states.add(stateString);
      }
    } else if (stateString === targetState) {
      const remaining = (1000000000 - x) % (x - targetStateIndex);
      x = 1000000000 - remaining;
      cycleAdjusted = true;
    }
  }
  return calculateLoad(input);
};

const stringify = (grid) => grid.map((row) => row.join("")).join("");

const shiftRockNorth = (grid) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "O") {
        for (let y2 = y - 1; y2 >= 0; y2--) {
          if (grid[y2][x] === "#" || grid[y2][x] === "O") break;

          grid[y2][x] = grid[y2 + 1][x];
          grid[y2 + 1][x] = ".";
        }
      }
    }
  }
};

const shiftRockWest = (grid) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "O") {
        for (let x2 = x - 1; x2 >= 0; x2--) {
          if (grid[y][x2] === "#" || grid[y][x2] === "O") break;

          grid[y][x2] = grid[y][x2 + 1];
          grid[y][x2 + 1] = ".";
        }
      }
    }
  }
};

const shiftRockSouth = (grid) => {
  for (let y = grid.length - 1; y >= 0; y--) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "O") {
        for (let y2 = y + 1; y2 < grid.length; y2++) {
          if (grid[y2][x] === "#" || grid[y2][x] === "O") break;

          grid[y2][x] = grid[y2 - 1][x];
          grid[y2 - 1][x] = ".";
        }
      }
    }
  }
};

const shiftRockEast = (grid) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = grid[0].length - 1; x >= 0; x--) {
      if (grid[y][x] === "O") {
        for (let x2 = x + 1; x2 < grid[y].length; x2++) {
          if (grid[y][x2] === "#" || grid[y][x2] === "O") break;

          grid[y][x2] = grid[y][x2 - 1];
          grid[y][x2 - 1] = ".";
        }
      }
    }
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

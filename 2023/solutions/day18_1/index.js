const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    const [dir, dist, color] = row.split(" ");
    return { dir, dist: +dist, color };
  });
};

const dirs = { L: [0, -1], R: [0, 1], U: [-1, 0], D: [1, 0] };

const calculateSolution = (input) => {
  let current = [0, 0];
  const outline = [{ pos: current, color: undefined }];
  for (const row of input) {
    const direction = dirs[row.dir];
    const { dist, color } = row;
    for (let x = 0; x < dist; x++) {
      const next = [direction[0] + current[0], direction[1] + current[1]];
      outline.push({ pos: next, color });
      current = next;
    }
  }

  const yValues = outline.map((val) => val.pos[0]);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const xValues = outline.map((val) => val.pos[1]);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const grid = [];
  for (let y = minY; y <= maxY; y++) {
    const row = [];
    for (let x = minX; x <= maxX; x++) {
      row.push(".");
    }
    grid.push(row);
  }

  for (const value of outline) {
    grid[value.pos[0] - minY][value.pos[1] - minX] = "#";
  }

  for (let x = 1; x < grid[0].length - 1; x++) {
    if (grid[0][x] !== "." && grid[0][x - 1] !== "." && grid[0][x + 1] !== ".") {
      flood(grid, [1, x]);
      break;
    }
  }

  return grid.reduce((acc, curr) => acc + curr.filter((val) => val !== ".").length, 0);
};

const flood = (grid, pos) => {
  const toCheck = new Set();
  toCheck.add({ target: pos });
  grid[pos[0]][pos[1]] = "#";
  while (toCheck.size > 0) {
    const current = [...toCheck][0];
    grid[current.target[0]][current.target[1]] = "#";
    for (const dir of Object.values(dirs)) {
      const target = [current.target[0] + dir[0], current.target[1] + dir[1]];
      if (grid[target[0]][target[1]] === ".") {
        grid[target[0]][target[1]] = "#";
        toCheck.add({ target });
      }
    }
    toCheck.delete(current);
  }
};

export default solution;

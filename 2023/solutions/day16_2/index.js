const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input
    .split("\n")
    .map((row) => row.split("").map((elem) => ({ chr: elem, energized: false, dirs: [] })));
};

const calculateSolution = (input) => {
  let max = 0;
  for (let x = 0; x < input[0].length; x++) {
    max = Math.max(calculateBeam(input, [0, x], [1, 0]), max);
    max = Math.max(calculateBeam(input, [input.length - 1, x], [-1, 0]), max);
  }
  for (let y = 0; y < input.length; y++) {
    max = Math.max(calculateBeam(input, [y, 0], [0, 1]), max);
    max = Math.max(calculateBeam(input, [0, input[y].length - 1], [0, -1]), max);
  }
  return max;
};

const pushIfValid = (paths, path, input) => {
  if (
    path.coords[0] + path.dir[0] >= 0 &&
    path.coords[1] + path.dir[1] >= 0 &&
    path.coords[0] + path.dir[0] < input.length &&
    path.coords[1] + path.dir[1] < input[0].length &&
    input[path.coords[0]][path.coords[1]].dirs.every(
      (dir) => dir[0] !== path.dir[0] || dir[1] !== path.dir[1]
    )
  ) {
    paths.push(path);
    input[path.coords[0]][path.coords[1]].dirs.push(path.dir);
  }
};

const rotateRight = (dir) => {
  return [dir[1], -dir[0]];
};

const rotateLeft = (dir) => {
  return [-dir[1], dir[0]];
};

export default solution;
function calculateBeam(input, startingPos, startingDir) {
  const grid = copy(input);
  let paths = [{ coords: startingPos, dir: startingDir }];
  while (paths.length) {
    const nextPaths = [];
    for (let x = 0; x < paths.length; x++) {
      const { coords, dir } = paths[x];
      const cell = grid[coords[0]][coords[1]];
      cell.energized = true;
      switch (input[coords[0]][coords[1]].chr) {
        case ".":
          pushIfValid(nextPaths, { coords, dir }, grid);
          break;
        case "/":
          pushIfValid(
            nextPaths,
            { coords, dir: dir[0] ? rotateRight(dir) : rotateLeft(dir) },
            grid
          );
          break;
        case "\\":
          pushIfValid(
            nextPaths,
            { coords, dir: dir[1] ? rotateRight(dir) : rotateLeft(dir) },
            grid
          );
          break;
        case "|":
          if (dir[1]) {
            pushIfValid(nextPaths, { coords, dir: rotateLeft(dir) }, grid);
            pushIfValid(nextPaths, { coords, dir: rotateRight(dir) }, grid);
          } else {
            pushIfValid(nextPaths, { coords, dir }, grid);
          }
          break;
        case "-":
          if (dir[0]) {
            pushIfValid(nextPaths, { coords, dir: rotateLeft(dir) }, grid);
            pushIfValid(nextPaths, { coords, dir: rotateRight(dir) }, grid);
          } else {
            pushIfValid(nextPaths, { coords, dir }, grid);
          }
      }
    }
    for (const nextPath of nextPaths) {
      nextPath.coords = [
        nextPath.coords[0] + nextPath.dir[0],
        nextPath.coords[1] + nextPath.dir[1],
      ];
      grid[nextPath.coords[0]][nextPath.coords[1]].energized = true;
    }
    paths = nextPaths;
  }

  return grid.reduce((acc, curr) => acc + curr.filter((elem) => elem.energized).length, 0);
}

const copy = (grid) => {
  return grid.map((row) => row.map((elem) => ({ ...elem, dirs: [] })));
};

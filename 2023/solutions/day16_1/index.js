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
  let paths = [{ coords: [0, 0], dir: [0, 1] }];
  while (paths.length) {
    const nextPaths = [];
    for (let x = 0; x < paths.length; x++) {
      const { coords, dir } = paths[x];
      const cell = input[coords[0]][coords[1]];
      cell.energized = true;
      switch (input[coords[0]][coords[1]].chr) {
        case ".":
          pushIfValid(nextPaths, { coords, dir }, input);
          break;
        case "/":
          pushIfValid(
            nextPaths,
            { coords, dir: dir[0] ? rotateRight(dir) : rotateLeft(dir) },
            input
          );
          break;
        case "\\":
          pushIfValid(
            nextPaths,
            { coords, dir: dir[1] ? rotateRight(dir) : rotateLeft(dir) },
            input
          );
          break;
        case "|":
          if (dir[1]) {
            pushIfValid(nextPaths, { coords, dir: rotateLeft(dir) }, input);
            pushIfValid(nextPaths, { coords, dir: rotateRight(dir) }, input);
          } else {
            pushIfValid(nextPaths, { coords, dir }, input);
          }
          break;
        case "-":
          if (dir[0]) {
            pushIfValid(nextPaths, { coords, dir: rotateLeft(dir) }, input);
            pushIfValid(nextPaths, { coords, dir: rotateRight(dir) }, input);
          } else {
            pushIfValid(nextPaths, { coords, dir }, input);
          }
      }
    }
    for (const nextPath of nextPaths) {
      nextPath.coords = [
        nextPath.coords[0] + nextPath.dir[0],
        nextPath.coords[1] + nextPath.dir[1],
      ];
      input[nextPath.coords[0]][nextPath.coords[1]].energized = true;
    }
    paths = nextPaths;
  }

  return input.reduce((acc, curr) => acc + curr.filter((elem) => elem.energized).length, 0);
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

const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) => {
  const [grid, directions] = input.split("\n\n");
  const arrayGrid = grid.split("\n").map((row) => row.split(""));
  const maxWidth = Math.max(...arrayGrid.map((row) => row.length));
  for (const row of arrayGrid) {
    while (row.length < maxWidth) {
      row.push(" ");
    }
  }
  const distances = directions.split(/[LR]/).map((val) => parseInt(val));
  const rotations = directions.split(/[0-9]+/).filter((val) => val);
  return { grid: arrayGrid, distances, rotations };
};

const calculateSolution = ({ grid, distances, rotations }) => {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let currentDirection = 0;
  let currentPosition;
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[0][x] === ".") {
      currentPosition = [0, x];
      break;
    }
  }

  const height = grid.length;
  const width = grid[0].length;
  for (let inst = 0; inst < distances.length; inst++) {
    for (let moves = 0; moves < distances[inst]; moves++) {
      let targetPos = [
        currentPosition[0] + directions[currentDirection][0],
        currentPosition[1] + directions[currentDirection][1],
      ];
      let targetDirection = currentDirection;
      let target = grid[targetPos[0]]?.[targetPos[1]];
      if (target === " " || target === undefined) {
        const [newPos, newDirection] = stepOverEdge(targetPos, currentDirection, directions);
        targetPos = newPos;
        targetDirection = newDirection;
        target = grid[targetPos[0]]?.[targetPos[1]];
      }
      if (target === "#") {
        break;
      }
      currentPosition = targetPos;
      currentDirection = targetDirection;
    }
    if (inst < rotations.length) {
      if (rotations[inst] === "R") {
        currentDirection += 1;
      } else {
        currentDirection += 3;
      }

      currentDirection %= 4;
    }
  }

  const finalRow = currentPosition[0] + 1;
  const finalCol = currentPosition[1] + 1;
  const facing = currentDirection;

  return 1000 * finalRow + 4 * finalCol + facing;
};

const stepOverEdge = (targetPos, direction) => {
  if (targetPos[0] < 50 && targetPos[1] === 49) {
    return [[149 - targetPos[0], 0], 0];
  }
  if (targetPos[0] < 100 && targetPos[1] === 49 && direction === 2) {
    return [[100, targetPos[0] - 50], 1];
  }
  if (targetPos[0] === 99 && targetPos[1] < 50 && direction === 3) {
    return [[targetPos[1] + 50, 50], 0];
  }
  if (targetPos[0] < 150 && targetPos[1] === -1) {
    return [[149 - targetPos[0], 50], 0];
  }
  if (targetPos[0] < 200 && targetPos[1] === -1) {
    return [[0, targetPos[0] - 100], 1];
  }
  if (targetPos[0] === 200 && targetPos[1] < 50) {
    return [[0, targetPos[1] + 100], 1];
  }
  if (targetPos[0] >= 150 && targetPos[1] === 50 && direction === 0) {
    return [[149, targetPos[0] - 100], 3];
  }
  if (targetPos[0] === 150 && targetPos[1] >= 50 && direction === 1) {
    return [[targetPos[1] + 100, 49], 2];
  }
  if (targetPos[0] >= 100 && targetPos[0] < 150 && targetPos[1] === 100) {
    return [[149 - targetPos[0], 149], 2];
  }
  if (targetPos[0] >= 50 && targetPos[0] < 100 && targetPos[1] === 100 && direction === 0) {
    return [[49, targetPos[0] + 50], 3];
  }
  if (targetPos[0] === 50 && targetPos[1] >= 100 && direction === 1) {
    return [[targetPos[1] - 50, 99], 2];
  }
  if (targetPos[0] < 50 && targetPos[1] === 150) {
    return [[149 - targetPos[0], 99], 2];
  }
  if (targetPos[0] === -1 && targetPos[1] >= 100) {
    return [[199, targetPos[1] - 100], 3];
  }
  if (targetPos[0] === -1 && targetPos[1] < 100) {
    return [[targetPos[1] + 100, 0], 0];
  }
  return [undefined, undefined];
};

export default solution;

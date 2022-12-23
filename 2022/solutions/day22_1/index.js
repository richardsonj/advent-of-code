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
        (currentPosition[0] + directions[currentDirection][0] + height) % height,
        (currentPosition[1] + directions[currentDirection][1] + width) % width,
      ];
      let target = grid[targetPos[0]]?.[targetPos[1]];
      while (target === " ") {
        targetPos = [
          (targetPos[0] + directions[currentDirection][0] + height) % height,
          (targetPos[1] + directions[currentDirection][1] + width) % width,
        ];
        target = grid[targetPos[0]]?.[targetPos[1]];
      }
      if (target === "#") {
        break;
      }
      currentPosition = targetPos;
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

export default solution;

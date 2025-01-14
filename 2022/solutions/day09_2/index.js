const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) => input.split("\n").map((row) => row.split(" "));

const possibleMoves = {
  U: [0, -1],
  D: [0, 1],
  L: [-1, 0],
  R: [1, 0],
};

const calculateSolution = (input) => {
  const headPos = [500, 500];

  const tailPos = [
    [500, 500],
    [500, 500],
    [500, 500],
    [500, 500],
    [500, 500],
    [500, 500],
    [500, 500],
    [500, 500],
    [500, 500],
  ];

  const grid = [];

  for (let x = 0; x < 1000; x++) {
    grid.push(new Array(1000).fill(false));
  }

  for (const move of input) {
    const moveAmount = move[1];
    const headVector = possibleMoves[move[0]];
    for (let x = 0; x < moveAmount; x++) {
      headPos[0] += headVector[0];
      headPos[1] += headVector[1];

      const tailVector = moveTail(headPos, tailPos[0]);
      tailPos[0][0] += tailVector[0];
      tailPos[0][1] += tailVector[1];

      for (let y = 1; y < tailPos.length; y++) {
        const tailVector = moveTail(tailPos[y - 1], tailPos[y]);
        tailPos[y][0] += tailVector[0];
        tailPos[y][1] += tailVector[1];
      }
      grid[tailPos[8][0]][tailPos[8][1]] = true;
    }
  }
  return grid.flat().reduce((acc, curr) => {
    acc += curr ? 1 : 0;
    return acc;
  }, 0);
};

const moveTail = (headPos, tailPos) => {
  const xDist = headPos[0] - tailPos[0];
  const yDist = headPos[1] - tailPos[1];
  if (xDist * xDist + yDist * yDist <= 2) {
    return [0, 0];
  }
  return [Math.round(xDist / (Math.abs(xDist) || 1)), Math.round(yDist / (Math.abs(yDist) || 1))];
};

export default solution;

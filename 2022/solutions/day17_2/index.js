const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("");
};

const calculateSolution = (wind) => {
  const shapes = [
    [["#"], ["#"], ["#"], ["#"]],
    [[".", "#", "."], ["#", "#", "#"], [".", "#", "."]],
    [["#", ".", "."], ["#", ".", "."], ["#", "#", "#"]],
    [["#", "#", "#", "#"]],
    [["#", "#"], ["#", "#"]]
  ]
  const cycle = 40;
  const extraNeeded = 1000000000000 % cycle;
  const iterations = Math.floor(1000000000000 / cycle);
  const grid = [];
  for (let x = 0; x < 7; x++) {
    grid.push(new Array(7).fill("."))
  }

  let shapeIndex = 0;
  let windIndex = 0;
  let currentTop = 0;

  let previousCycleHeight = 0;
  let cycleHeightDiffs = [];
  let previousCycleIt = 0;
  let cycleLengths = [];

  let topOffset = 0;

  const indexSet = new Set();
  let cycleIndexes;
  for (let it = 0; it < 1000000000000; it++) {
    const indexKey = `${shapeIndex}-${windIndex}`;
    if (!cycleIndexes) {
      if (indexSet.has(indexKey)) {
        cycleIndexes = [shapeIndex, windIndex];
      } else {
        indexSet.add(indexKey);
      }
    } else {
      if (shapeIndex === cycleIndexes[0] && windIndex === cycleIndexes[1]) {
        cycleHeightDiffs.push(currentTop - previousCycleHeight);
        previousCycleHeight = currentTop;
        cycleLengths.push(it - previousCycleIt);
        previousCycleIt = it;

        if (cycleHeightDiffs.length >= 3) {
          const lastThreeHeightDiffs = cycleHeightDiffs.slice(-3);
          const lastThreeCycleLengths = cycleLengths.slice(-3);
          if (lastThreeHeightDiffs[0] === lastThreeHeightDiffs[1] &&
            lastThreeHeightDiffs[0] === lastThreeHeightDiffs[2] &&
            lastThreeCycleLengths[0] === lastThreeCycleLengths[1] &&
            lastThreeCycleLengths[0] === lastThreeCycleLengths[2]) {
            const cycleLength = lastThreeCycleLengths[0];
            const heightPerCycle = lastThreeHeightDiffs[0];
            const shapesLeft = 1000000000000 - it;
            const cyclesRemaining = Math.floor((shapesLeft) / cycleLength);
            topOffset = cyclesRemaining * heightPerCycle;
            it += (cyclesRemaining * cycleLength);
            if (it >= 1000000000000) {
              break;
            }
          }
        }
      }
    }

    const gridHeight = grid[0].length;
    for (let y = 0; y < currentTop + 7 - gridHeight; y++) {
      for (let x = 0; x < 7; x++) {
        grid[x].push(".");
      }
    }
    let shapeOffset = [2, currentTop + 3];
    const shape = shapes[shapeIndex]

    shapeIndex++;
    shapeIndex %= shapes.length;
    while (true) {
      const windOffset = wind[windIndex] === "<" ? -1 : 1;
      const offsetAfterWind = [shapeOffset[0] + windOffset, shapeOffset[1]];
      windIndex++;
      windIndex %= wind.length;
      if (isValid(grid, shape, offsetAfterWind)) {
        shapeOffset = offsetAfterWind;
      }
      const offsetAfterFall = [shapeOffset[0], shapeOffset[1] - 1];
      if (isValid(grid, shape, offsetAfterFall)) {
        shapeOffset = offsetAfterFall;
      } else {
        drawShape(grid, shape, shapeOffset);
        currentTop = Math.max(currentTop, shapeOffset[1] + shape[0].length)
        break;
      }
    }
  }

  return currentTop + topOffset;
};

const isValid = (grid, shape, offset) => {
  for (let x = 0; x < shape.length; x++) {
    for (let y = 0; y < shape[0].length; y++) {
      if (shape[x][y] === ".") {
        continue;
      }
      const gridX = offset[0] + x;
      const gridY = offset[1] + y;
      if (gridX < 0 || gridX >= 7 || gridY < 0) {
        return false;
      }
      if (grid[gridX][gridY] === "#") {
        return false;
      }
    }
  }
  return true;
}

const drawShape = (grid, shape, offset) => {
  for (let x = 0; x < shape.length; x++) {
    for (let y = 0; y < shape[0].length; y++) {
      if (shape[x][y] === ".") {
        continue;
      }
      const gridX = offset[0] + x;
      const gridY = offset[1] + y;
      grid[gridX][gridY] = "#";
    }
  }
}

export default solution;

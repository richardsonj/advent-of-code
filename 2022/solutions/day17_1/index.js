const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("");
};

const calculateSolution = (wind) => {
  const grid = [];
  for (let x = 0; x < 7; x++) {
    grid.push(new Array(7).fill("."))
  }
  const shapes = [
    [["#"], ["#"], ["#"], ["#"]],
    [[".", "#", "."], ["#", "#", "#"], [".", "#", "."]],
    [["#", ".", "."], ["#", ".", "."], ["#", "#", "#"]],
    [["#", "#", "#", "#"]],
    [["#", "#"], ["#", "#"]]
  ]
  let shapeIndex = 0;
  let windIndex = 0;
  let currentTop = 0;

  for (let it = 0; it < 2022; it++) {
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
  return currentTop;
};

const isValid = (grid, shape, offset) => {
  for (let x = 0; x < shape.length; x++) {
    for (let y = 0; y < shape[0].length; y++) {
      if (shape[x][y]===".") {
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
      if (shape[x][y]===".") {
        continue;
      }
      const gridX = offset[0] + x;
      const gridY = offset[1] + y;
      grid[gridX][gridY] = "#";
    }
  }
}

export default solution;

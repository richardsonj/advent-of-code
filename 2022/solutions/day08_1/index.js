const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) =>
  input
    .split("\n")
    .map((row) => row.split("").map((val) => ({ height: parseInt(val), visible: false })));

const calculateSolution = (input) => {
  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[0].length; y++) {
      for (let x2 = 0; x2 <= x; x2++) {
        if (x === x2) {
          input[x][y].visible = true;
        } else if (input[x2][y].height >= input[x][y].height) {
          break;
        }
      }
      for (let x2 = input.length - 1; x2 >= x; x2--) {
        if (x === x2) {
          input[x][y].visible = true;
        } else if (input[x2][y].height >= input[x][y].height) {
          break;
        }
      }
      for (let y2 = 0; y2 <= y; y2++) {
        if (y === y2) {
          input[x][y].visible = true;
        } else if (input[x][y2].height >= input[x][y].height) {
          break;
        }
      }
      for (let y2 = input[0].length - 1; y2 >= y; y2--) {
        if (y === y2) {
          input[x][y].visible = true;
        } else if (input[x][y2].height >= input[x][y].height) {
          break;
        }
      }
    }
  }
  return input.flat().reduce((acc, curr) => {
    acc += curr.visible ? 1 : 0;
    return acc;
  }, 0);
};

export default solution;

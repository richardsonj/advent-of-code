const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map(row => row.split("").map((val) => parseInt(val)));
};

const calculateSolution = (input) => {
  let maxScore = 0;

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[0].length; y++) {
      let xScore1 = 0;
      let xScore2 = 0;
      let yScore1 = 0;
      let yScore2 = 0;
      for (let x2 = x - 1; x2 >= 0; x2--) {
        xScore1++;
        if (input[x2][y] >= input[x][y]) {
          break;
        }
      }
      for (let x2 = x + 1; x2 < input.length; x2++) {
        xScore2++;
        if (input[x2][y] >= input[x][y]) {
          break;
        }
      }
      for (let y2 = y - 1; y2 >= 0; y2--) {
        yScore1++;
        if (input[x][y2] >= input[x][y]) {
          break;
        }
      }
      for (let y2 = y + 1; y2 < input[0].length; y2++) {
        yScore2++;
        if (input[x][y2] >= input[x][y]) {
          break;
        }
      }
      maxScore = Math.max(maxScore, xScore1 * xScore2 * yScore1 * yScore2)
    }
  }
  return maxScore;
};

export default solution;

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) =>
    line
      .trim()
      .split(/\s+/)
      .map((num) => parseInt(num))
  );
};

const calculateSolution = (input) => {
  let count = 0;
  let cols = [[], [], []];
  for (let row of input) {
    cols[0].push(row[0]);
    cols[1].push(row[1]);
    cols[2].push(row[2]);
    if (cols[0].length == 3) {
      for (let col of cols) {
        col.sort((a, b) => a - b);
        if (col[0] + col[1] > col[2]) {
          count++;
        }
      }
      cols = [[], [], []];
    }
  }
  return count;
};

export default solution;

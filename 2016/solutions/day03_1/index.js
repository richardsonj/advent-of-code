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
  for (const row of input) {
    row.sort((a, b) => a - b);
    if (row[0] + row[1] > row[2]) {
      count++;
    }
  }
  return count;
};

export default solution;

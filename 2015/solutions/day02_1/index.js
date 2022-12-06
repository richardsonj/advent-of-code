const day02_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => {
    let lineArray = line.split("x").map((val) => parseInt(val));
    lineArray.sort((a,b)=>a-b);
    return lineArray;
  });
};

const calculateSolution = (parsedInput) => {
  return parsedInput.reduce((acc, curr) => {
    acc +=
      3 * curr[0] * curr[1] + 2 * curr[1] * curr[2] + 2 * curr[0] * curr[2];
    return acc;
  }, 0);
};

export default day02_1;

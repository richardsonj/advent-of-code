const day02_2 = {
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
      curr[0] * curr[1] * curr[2] + 2*curr[0] + 2*curr[1]
    return acc;
  }, 0);
};

export default day02_2;

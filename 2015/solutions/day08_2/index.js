const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n");
};

const calculateSolution = (input) => {
  let escapeCount = 0;
  for (let line of input) {
    let newLine = line.replace(/\\/g, "\\\\");
    newLine = newLine.replace(/"/g, "\\\"");
    escapeCount += newLine.length-line.length + 2;
  }
  return escapeCount;
};
export default solution;

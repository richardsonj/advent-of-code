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
    let newLine = line.substring(1, line.length-1);
    newLine = newLine.replace(/\\x([A-Fa-f0-9]{2})/g, " ");
    newLine = newLine.replace(/\\\"/g, " ");
    newLine = newLine.replace(/\\\\/g, " ");
    escapeCount += line.length-newLine.length;
  }
  return escapeCount;
};
export default solution;

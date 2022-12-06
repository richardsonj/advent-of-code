const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((row) => row.split("\t").map(char=>parseInt(char)));
};

const calculateSolution = (input) => {
  return input.reduce(
    (acc, curr) => getAnswer(curr) + acc,
    0
  );
};

const getAnswer = (row) => {
  for (let num1 of row) {
    for (let num2 of row) {
      if (num1 === num2) continue;
      if (num1 % num2) continue;
      return num1 / num2;
    }
  }
};

export default solution;

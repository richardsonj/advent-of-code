const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return JSON.parse(input);
};

const calculateSolution = (parsedInput) => {
  return parseObject(parsedInput);
};

function parseObject(obj) {
  let total = 0;
  for (let x in obj) {
    switch (typeof obj[x]) {
      case "number":
        total += obj[x];
        break;
      case "object":
        total += parseObject(obj[x]);
    }
  }
  return total;
}

export default solution;

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
      case "string":
        if (obj[x] === "red" && !Array.isArray(obj)) {
          return 0;
        }
        break;
      case "array":
      case "object":
        total += parseObject(obj[x]);
        break;
    }
  }
  return total;
}

export default solution;

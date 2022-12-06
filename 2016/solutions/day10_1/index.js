const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").reduce((acc, val) => {
    let match = val.match(/value (\d*) goes to bot (\d*)/);
    if (match) {
      const botKey = `B${match[2]}`;
      if (!acc[botKey]) {
        acc[botKey] = { val: [] };
      }
      acc[botKey].val.push(parseInt(match[1]));
      acc[botKey].val.sort((a, b) => a - b);
      return acc;
    }
    match = val.match(
      /bot (\d*) gives low to (\w*) (\d*) and high to (\w*) (\d*)/
    );
    if (match) {
      const botKey = `B${match[1]}`;
      if (!acc[botKey]) {
        acc[botKey] = { val: [] };
      }
      acc[botKey].low = `${match[2] === "bot" ? "B" : "O"}${match[3]}`;
      acc[botKey].high = `${match[4] === "bot" ? "B" : "O"}${match[5]}`;
      return acc;
    }
    throw new Error(`Couldn't parse line: ${val}`);
  }, {});
};

const calculateSolution = (input) => {
  while (true) {
    for (let key in input) {
      if (input[key].val.length === 2) {
        if (input[key].val[0] === 17 && input[key].val[1] === 61) {
          return key;
        }
        if (input[key].low.startsWith("B")) {
          input[input[key].low].val.push(input[key].val[0]);
          input[input[key].low].val.sort((a, b) => a - b);
        }
        if (input[key].high.startsWith("B")) {
          input[input[key].high].val.push(input[key].val[1]);
          input[input[key].high].val.sort((a, b) => a - b);
        }
        input[key].val = [];
      }
    }
  }
};

export default solution;

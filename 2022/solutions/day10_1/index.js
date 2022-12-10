const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row)=>row === "noop" ? 0 : parseInt(row.split(" ")[1]));
};

const calculateSolution = (input) => {
  let value = 1;
  let sum = 0;
  let cycle = 1;
  for (let x = 0; x < input.length; x++) {
    value += input[x];
    cycle+= (input[x] ? 2 : 1)
    if ((cycle+20) % 40 === 0 || (input[x] && (cycle+20) % 40 === 1)) {
      const valueToUse = cycle % 2 ? value-input[x] : value;
      sum += (valueToUse*((cycle % 2) ? cycle - 1 : cycle));
    }
  }
  return sum;
};

export default solution;

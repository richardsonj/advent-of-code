const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((instruction) => {
    const match = instruction.match(
      /([a-z]+) (inc|dec) (\-?[0-9]+) if ([a-z]+) ([><=!]+) (\-?[0-9]+)/
    );
    return {
      destination: match[1],
      operation: match[2],
      amount: parseInt(match[3]),
      source: match[4],
      comp: match[5],
      compTo: parseInt(match[6]),
    };
  });
};

const calculateSolution = (input) => {
  const registers = input.reduce((acc, curr) => {
    acc[curr.destination] = 0;
    acc[curr.source] = 0;
    return acc;
  }, {});
  for (let instruction of input) {
    const compValue = registers[instruction.source];
    const compResult = doCompare(
      compValue,
      instruction.comp,
      instruction.compTo
    );
    if (compResult) {
      applyInstruction(instruction, registers);
    }
  }
  return Math.max(...Object.values(registers));
};

const applyInstruction = (instruction, registers) => {
  switch (instruction.operation) {
    case "inc":
      registers[instruction.destination] += instruction.amount;
      break;
    case "dec":
      registers[instruction.destination] -= instruction.amount;
      break;
  }
};

const doCompare = (left, operation, right) => {
  switch (operation) {
    case "<":
      return left < right;
    case ">":
      return left > right;
    case "<=":
      return left <= right;
    case ">=":
      return left >= right;
    case "==":
      return left === right;
    case "!=":
      return left !== right;
  }
};

export default solution;

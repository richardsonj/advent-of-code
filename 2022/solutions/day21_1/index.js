const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) =>
  input
    .split("\n")
    .map((row) => {
      const parts = row.split(": ");
      return { id: parts[0], value: parseValue(parts[1]) };
    })
    .reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

const parseValue = (value) => {
  const numberValue = parseInt(value);
  if (!Number.isNaN(numberValue)) {
    return () => numberValue;
  }
  const parts = value.split(" ");
  switch (parts[1]) {
    case "/":
      return (monkeys) => monkeys[parts[0]].value(monkeys) / monkeys[parts[2]].value(monkeys);
    case "*":
      return (monkeys) => monkeys[parts[0]].value(monkeys) * monkeys[parts[2]].value(monkeys);
    case "+":
      return (monkeys) => monkeys[parts[0]].value(monkeys) + monkeys[parts[2]].value(monkeys);
    case "-":
      return (monkeys) => monkeys[parts[0]].value(monkeys) - monkeys[parts[2]].value(monkeys);
  }
  return undefined;
};

const calculateSolution = (monkeys) => {
  return monkeys.root.value(monkeys);
};

export default solution;

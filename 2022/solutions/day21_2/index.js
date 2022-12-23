const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) =>
  input
    .split("\n")
    .map((row) => {
      const parts = row.split(": ");
      return { id: parts[0], value: parseValue(parts[0], parts[1]) };
    })
    .reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

const parseValue = (id, value) => {
  if (id === "humn") {
    return () => "X";
  }
  const numberValue = parseInt(value);
  if (!Number.isNaN(numberValue)) {
    return () => numberValue;
  }
  const parts = value.split(" ");
  if (id === "root") {
    parts[1] = "=";
  }
  return (monkeys) => {
    const left = monkeys[parts[0]].value(monkeys);
    const right = monkeys[parts[2]].value(monkeys);
    let unsolved = false;
    if (typeof left === "string" || typeof right === "string") {
      unsolved = true;
    }
    switch (parts[1]) {
      case "/":
        return unsolved ? `(${left}/${right})` : left / right;
      case "*":
        return unsolved ? `(${left}*${right})` : left * right;
      case "+":
        return unsolved ? `(${left}+${right})` : left + right;
      case "-":
        return unsolved ? `(${left}-${right})` : left - right;
      case "=":
        return `${left} = ${right}`;
    }
    return undefined;
  };
};

const calculateSolution = (monkeys) => {
  return monkeys.root.value(monkeys);
};

export default solution;

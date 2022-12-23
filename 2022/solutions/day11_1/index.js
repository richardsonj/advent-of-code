const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) => input.split("\n\n").map((monkey) => parseMonkey(monkey));

const parseMonkey = (input) => {
  const lines = input.split("\n");
  const op = lines[2].split(" ").slice(-2)[0];
  const operand = lines[2].split(" ").slice(-2)[1];
  const modVal = parseInt(lines[3].split(" ").slice(-1)[0]);
  const trueVal = parseInt(lines[4].split(" ").slice(-1)[0]);
  const falseVal = parseInt(lines[5].split(" ").slice(-1)[0]);
  return {
    id: parseInt(lines[0][7]),
    items: lines[1]
      .split(": ")[1]
      .split(",")
      .map((item) => parseInt(item)),
    operation: (old) => operation(old, op, operand),
    test: (value) => (value % modVal === 0 ? trueVal : falseVal),
    inspections: 0,
  };
};

const operation = (val, op, operand) => {
  let opValue;
  if (operand === "old") {
    opValue = val;
  } else {
    opValue = parseInt(operand);
  }
  switch (op) {
    case "+":
      return val + opValue;
    case "*":
      return val * opValue;
  }
};

const calculateSolution = (input) => {
  const monkeyMap = input.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});
  for (let round = 1; round <= 20; round++) {
    for (const monkey of input) {
      monkey.inspections += monkey.items.length;
      for (const item of monkey.items) {
        const highWorry = monkey.operation(item);
        const newVal = Math.floor(highWorry / 3);
        const target = monkey.test(newVal);
        monkeyMap[target].items.push(newVal);
      }
      monkey.items = [];
    }
  }

  const inspections = input.map((monkey) => monkey.inspections);
  inspections.sort((a, b) => a - b);
  return inspections.splice(-2).reduce((acc, curr) => acc * curr, 1);
};

export default solution;

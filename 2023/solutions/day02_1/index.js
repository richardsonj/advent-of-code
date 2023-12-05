const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    const [gameLabel, sets] = row.split(": ");
    const id = +gameLabel.split(" ")[1];
    const pairs = sets.split("; ");
    const pairObjs = pairs.map((pair) => {
      const groups = pair.split(", ");
      return groups.map((group) => {
        const [count, color] = group.split(" ");
        return { count: +count, color };
      });
    });
    return { id, balls: pairObjs };
  });
};

const counts = { red: 12, green: 13, blue: 14 };

const calculateSolution = (input) => {
  let count = 0;
  for (const row of input) {
    if (row.balls.every((set) => !set.some((color) => counts[color.color] < color.count))) {
      count += row.id;
    }
  }
  return count;
};

export default solution;

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

const calculateSolution = (input) => {
  let sum = 0;
  for (const row of input) {
    const counts = { red: 0, blue: 0, green: 0 };
    for (const set of row.balls) {
      for (const ball of set) {
        counts[ball.color] = Math.max(counts[ball.color], ball.count);
      }
    }
    sum += Object.values(counts).reduce((a, b) => a * b, 1);
  }
  return sum;
};

export default solution;

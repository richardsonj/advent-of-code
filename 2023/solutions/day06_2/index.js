const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  const [timeStr, distanceStr] = input.split("\n");
  const time = +timeStr
    .split(/ +/)
    .filter((v, i) => i > 0)
    .join("");
  const dist = distanceStr
    .split(/ +/)
    .filter((v, i) => i > 0)
    .join("");
  return { time, dist };
};

const calculateSolution = (input) => {
  let count = 0;
  for (let x = 1; x < input.time; x++) {
    if ((input.time - x) * x > input.dist) {
      count++;
    }
  }
  return count;
};

export default solution;

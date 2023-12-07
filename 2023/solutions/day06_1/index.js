const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  const [timeStr, distanceStr] = input.split("\n");
  const times = timeStr
    .split(/ +/)
    .filter((v, i) => i > 0)
    .map((val) => +val);
  const dists = distanceStr
    .split(/ +/)
    .filter((v, i) => i > 0)
    .map((val) => +val);
  const races = [];
  for (let x = 0; x < times.length; x++) {
    races.push({ time: times[x], dist: dists[x] });
  }
  return races;
};

const calculateSolution = (input) => {
  let total = 1;
  for (const race of input) {
    let count = 0;
    for (let x = 1; x < race.time; x++) {
      if ((race.time - x) * x > race.dist) {
        count++;
      }
    }
    total *= count;
  }
  return total;
};

export default solution;

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => {
    let match = line.match(
      /(\w*) can fly (\d*) km\/s for (\d*) seconds, but then must rest for (\d*) seconds./
    );
    return {
      name: match[1],
      speed: parseInt(match[2]),
      duration: parseInt(match[3]),
      rest: parseInt(match[4]),
    };
  });
};

const calculateSolution = (reindeer) => {
  let maxDistance = 0;
  for (let deer of reindeer) {
    let distance = 0;
    let period = deer.duration + deer.rest;
    let numPeriods = Math.floor(2503/period);
    distance += numPeriods * deer.duration * deer.speed;
    let remainder = 2503 % (period*numPeriods);
    distance += Math.min(remainder, deer.duration) * deer.speed;
    maxDistance = Math.max(maxDistance, distance);
  }
  return maxDistance;
};

export default solution;

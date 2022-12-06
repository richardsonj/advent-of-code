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
  let scores = {};
  for (let deer of reindeer) {
    scores[deer.name] = 0;
  }
  for (let x = 1; x <= 2503; x++) {
    let winningDeer = [];
    let winningDistance = 0;
    for (let deer of reindeer) {
      let distance = 0;
      let period = deer.duration + deer.rest;
      let numPeriods = Math.floor(x / period);
      distance += numPeriods * deer.duration * deer.speed;
      let remainder = x - (period * numPeriods);
      distance += Math.min(remainder, deer.duration) * deer.speed;
      if (distance > winningDistance) {
        winningDeer = [deer.name];
        winningDistance = distance;
      } else if (distance === winningDistance) {
        winningDeer.push(deer.name);
      }
    }
    for (let winner of winningDeer) {
      scores[winner]++;
    }
  }
  return Math.max(...Object.values(scores));
};

export default solution;

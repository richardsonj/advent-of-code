const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input
    .split("\n")
    .map((row) =>
      row.match(/Disc #([0-9]+) has ([0-9]+) positions; at time=0, it is at position ([0-9]+)./)
    )
    .map((row) => ({ offset: parseInt(row[1]), size: parseInt(row[2]), pos: parseInt(row[3]) }));
};

const calculateSolution = (input) => {
  let seconds = 0;
  let lcm = 1;
  for (const disc of input) {
    seconds += calculateDisc(disc, lcm, seconds);
    lcm *= disc.size;
  }
  return seconds;
};

const calculateDisc = (disc, lcm, elapsed) => {
  let secondsToWait = disc.size - ((disc.pos + elapsed) % disc.size) - disc.offset;
  while (secondsToWait < 0 || secondsToWait % lcm !== 0) {
    secondsToWait += disc.size;
  }
  return secondsToWait;
};

export default solution;

// 815669

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return parseInt(input);
};

const calculateSolution = (input) => {
  const elves = Object.keys(new Array(input).fill(0)).map((val) => parseInt(val) + 1);
  let target = Math.floor(elves.length / 2);
  if (elves.length % 2 === 1) {
    elves.splice(target, 1);
    target++;
  }
  while (elves.length > 1) {
    if (elves.length % 10000 === 0) {
      console.log(elves.length);
    }
    if (target === elves.length - 1) {
      elves.splice(target, 1);
      if (elves.length > 1) {
        elves.splice(0, 1);
      }
    } else {
      elves.splice(target, 2);
      target++;
    }

    target %= elves.length;
  }
  return parseInt(elves[0]);
};

export default solution;

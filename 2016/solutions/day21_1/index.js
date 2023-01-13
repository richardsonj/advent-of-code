const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n");
};

const calculateSolution = (input) => {
  const value = "abcdefgh".split("");
  const instructions = input.map(createInstruction);
  for (const instruction of instructions) {
    instruction(value);
  }
  return value.join("");
};

const createInstruction = (raw) => {
  let matches = raw.match(/swap position ([0-9]+) with position ([0-9]+)/);
  if (matches) {
    const first = parseInt(matches[1]);
    const second = parseInt(matches[2]);
    return (value) => swapPosition(value, first, second);
  }
  matches = raw.match(/swap letter ([a-z]+) with letter ([a-z]+)/);
  if (matches) {
    return (value) => swapLetters(value, matches[1], matches[2]);
  }
  matches = raw.match(/rotate left ([0-9]+) step(?:s?)/);
  if (matches) {
    return (value) => {
      const amount = parseInt(matches[1]);
      rotate(value, -amount);
    };
  }
  matches = raw.match(/rotate right ([0-9]+) step(?:s?)/);
  if (matches) {
    return (value) => {
      const amount = parseInt(matches[1]);
      rotate(value, amount);
    };
  }
  // rotate based on position of letter X
  matches = raw.match(/rotate based on position of letter ([a-z]+)/);
  if (matches) {
    return (value) => {
      const index = value.indexOf(matches[1]);
      const amount = 1 + index + (index >= 4 ? 1 : 0);
      rotate(value, amount);
    };
  }
  // reverse positions X through Y
  matches = raw.match(/reverse positions ([0-9]+) through ([0-9]+)/);
  if (matches) {
    return (value) => {
      reverse(value, parseInt(matches[1]), parseInt(matches[2]));
    };
  }
  // move position X to position Y
  matches = raw.match(/move position ([0-9]+) to position ([0-9]+)/);
  if (matches) {
    return (value) => {
      move(value, parseInt(matches[1]), parseInt(matches[2]));
    };
  }
  throw new Error(`Couldn't parse instruction: ${raw}`);
};

const swapPosition = (value, first, second) => {
  const temp = value[first];
  value[first] = value[second];
  value[second] = temp;
};
const swapLetters = (value, first, second) => {
  const firstIndex = value.indexOf(first);
  const secondIndex = value.indexOf(second);
  swapPosition(value, firstIndex, secondIndex);
};
const reverse = (value, start, end) => {
  while (start < end) {
    [value[start], value[end]] = [value[end], value[start]];
    start++;
    end--;
  }
};

const rotate = (value, amount) => {
  amount += 20 * value.length;
  amount %= value.length;
  reverse(value, 0, value.length - 1);
  reverse(value, 0, amount - 1);
  reverse(value, amount, value.length - 1);

  return value;
};

const move = (value, start, end) => {
  const toMove = value.splice(start, 1)[0];
  value.splice(end, 0, toMove);
};

export default solution;

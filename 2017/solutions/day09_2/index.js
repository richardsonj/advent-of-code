const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

let score = 0;

const parseInput = (input) => {
  return input;
};

const calculateSolution = (input) => {
  parseGroup(input, 1);
  return score;
};

const parseGroup = (input, startIndex, depth = 0) => {
  let i = startIndex;
  for (; input[i] !== "}"; i++) {
    if (input[i] === "<") {
      i = parseTrash(input, i + 1);
    } else if (input[i] === "{") {
      i =parseGroup(input, i + 1, depth + 1);
    }
  }
  return i;
};

const parseTrash = (input, startIndex) => {
  let i = startIndex;
  for (; input[i] !== ">"; i++) {
    score += 1
    if (input[i] === "!") {
      score -= 1;
      i++;
    }
  }
  return i;
}

export default solution;

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n\n").map((pair) => pair.split("\n").map(set => JSON.parse(set)));
};

const calculateSolution = (input) => {
  const result = input.map(pair => compare(pair[0], pair[1]));
  return result.reduce((acc, curr, index) => acc + (curr ? (index + 1) : 0), 0);;
};

const compare = (left, right) => {
  if (left === undefined) {
    return true;
  }
  if (right === undefined) {
    return false;
  }
  if (Array.isArray(left) && !Array.isArray(right)) {
    return compare(left, [right]);
  }
  if (!Array.isArray(left) && Array.isArray(right)) {
    return compare([left], right);
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    for (let x = 0; x < left.length; x++) {
      const result = compare(left[x], right[x]);
      if (result === true || result === false) {
        return result;
      }
    }
    if (left.length > right.length) {
      return false;
    }
    if (left.length < right.length) {
      return true;
    }
    return undefined;
  }
  if (left === right) {
     return undefined;
  }
  return left < right;
}

export default solution;

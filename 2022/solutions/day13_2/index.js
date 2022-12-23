const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) =>
  input.split("\n\n").map((pair) => pair.split("\n").map((set) => JSON.parse(set)));

const calculateSolution = (input) => {
  const divider1 = [[2]];
  const divider2 = [[6]];
  input = input.flat();
  input.push(divider1);
  input.push(divider2);
  input.sort(compare);
  return (input.indexOf(divider1) + 1) * (input.indexOf(divider2) + 1);
};

const compare = (left, right) => {
  if (left === undefined) {
    return -1;
  }
  if (right === undefined) {
    return 1;
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
      if (result === -1 || result === 1) {
        return result;
      }
    }
    if (left.length > right.length) {
      return 1;
    }
    if (left.length < right.length) {
      return -1;
    }
    return 0;
  }
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
};

export default solution;

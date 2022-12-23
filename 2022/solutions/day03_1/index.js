const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) => input.split("\n");

const calculateSolution = (input) => {
  let sum = 0;
  for (const row of input) {
    const left = row.slice(0, row.length / 2);
    const right = row.slice(row.length / 2, row.length);
    const match = findMatch(left, right);
    sum += priority(match);
  }
  return sum;
};

const priority = (char) => {
  const ascii = char.charCodeAt(0);
  if (ascii >= 97) {
    return ascii - 96;
  }
  return ascii - 64 + 26;
};

export default solution;
function findMatch(left, right) {
  for (const leftChar of left) {
    for (const rightChar of right) {
      if (leftChar === rightChar) {
        return leftChar;
      }
    }
  }
}

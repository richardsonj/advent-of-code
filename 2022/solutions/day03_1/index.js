const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n");
};

const calculateSolution = (input) => {
  let sum = 0;
  for (let row of input) {
    const left = row.slice(0, row.length/2)
    const right = row.slice(row.length/2, row.length);
    const match = findMatch(left, right);
    sum+= priority(match);

  }
  return sum;
};

const priority = (char)=> {
  const ascii = char.charCodeAt(0);
  if (ascii >= 97) {
    return ascii - 96;
  }
  return ascii - 64 + 26;
}

export default solution;
function findMatch(left, right) {
  for (let leftChar of left) {
    for (let rightChar of right) {
      if (leftChar === rightChar) {
        return leftChar;
      }
    }
  }
}


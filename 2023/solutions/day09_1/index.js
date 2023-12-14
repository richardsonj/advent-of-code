const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => row.split(" ").map((val) => +val));
};

const calculateSolution = (input) => {
  let total = 0;
  for (const seq of input) {
    const sequences = [seq];
    while (sequences[sequences.length - 1].some((val) => val !== 0)) {
      sequences.push(getNextSequence(sequences[sequences.length - 1]));
    }
    total += sequences.reduce((acc, curr) => acc + curr[curr.length - 1], 0);
  }
  return total;
};

const getNextSequence = (seq) => {
  const nextSequence = [];
  for (let x = 0; x < seq.length - 1; x++) {
    nextSequence.push(seq[x + 1] - seq[x]);
  }
  return nextSequence;
};

export default solution;

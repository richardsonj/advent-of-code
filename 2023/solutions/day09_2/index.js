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
    let nextValue = 0;
    for (let x = sequences.length - 2; x >= 0; x--) {
      nextValue = sequences[x][0] - nextValue;
    }
    total += nextValue;
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

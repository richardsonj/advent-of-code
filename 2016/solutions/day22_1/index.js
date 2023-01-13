const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").splice(2);
};

const calculateSolution = (input) => {
  const nodes = input.map((row) => {
    const match = row.match(
      /\/dev\/grid\/node-x([0-9]+)-y([0-9]+)(?:\s+)(?:[0-9]+)T(?:\s+)([0-9]+)T(?:\s+)([0-9]+)T(?:\s+)(?:[0-9]+)%/
    );

    return {
      x: parseInt(match[1]),
      y: parseInt(match[2]),
      used: parseInt(match[3]),
      available: parseInt(match[4]),
    };
  });

  let count = 0;
  for (const A of nodes) {
    for (const B of nodes) {
      if (A !== B && A.used > 0 && B.available >= A.used) {
        count++;
      }
    }
  }
  return count;
};

export default solution;

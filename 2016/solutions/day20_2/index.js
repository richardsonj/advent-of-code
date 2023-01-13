const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => row.split("-").map((val) => parseInt(val)));
};

const calculateSolution = (input) => {
  const allowedRanges = [[0, 4294967295]];
  input.sort((a, b) => a[0] - b[0]);
  // console.log(input);
  for (const range of input) {
    const overlaps = [];
    for (const allowedRange of allowedRanges) {
      if (range[1] >= allowedRange[0] && range[0] <= allowedRange[1]) {
        overlaps.push(allowedRange);
      }
    }
    for (const overlap of overlaps) {
      const difference = findDiff(overlap, range);
      allowedRanges.splice(allowedRanges.indexOf(overlap), 1);
      allowedRanges.push(...difference);
    }
  }
  return allowedRanges.reduce((acc, curr) => acc + curr[1] - curr[0] + 1, 0);
};

const findDiff = (allowed, remove) => {
  const newRanges = [];
  if (remove[0] <= allowed[0]) {
    if (remove[1] >= allowed[1]) {
      // {  [    ]   }
    }
    // {   [   }####]
    newRanges.push([remove[1] + 1, allowed[1]]);
  } else if (remove[1] >= allowed[1]) {
    // [####{  ]  }
    newRanges.push([allowed[0], remove[0] - 1]);
  } else {
    // [#####{    }####]
    newRanges.push([allowed[0], remove[0] - 1], [remove[1] + 1, allowed[1]]);
  }

  return newRanges;
};

export default solution;

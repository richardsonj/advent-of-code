const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    const [springs, segments] = row.split(" ");
    return { springs: springs.split(""), segments: segments.split(",").map((val) => +val) };
  });
};

const calculateSolution = (input) => {
  let total = 0;
  for (const row of input) {
    total += fillSpring(row.springs, 0, row.segments);
  }
  return total;
};

const fillSpring = (row, index, segments) => {
  let total = 0;
  if (index === row.length) {
    return check(row, segments) ? 1 : 0;
  }
  if (row[index] === "?") {
    for (const fill of ["#", "."]) {
      row[index] = fill;
      total += fillSpring(row, index + 1, segments);
      row[index] = "?";
    }
  } else {
    total += fillSpring(row, index + 1, segments);
  }
  return total;
};

const check = (row, segments) => {
  const rowSegments = [];
  let count = 0;
  for (let x = 0; x < row.length; x++) {
    if (row[x] === "#") {
      count++;
      continue;
    }
    if (row[x] === "." && count) {
      rowSegments.push(count);
      count = 0;
    }
  }
  if (count) rowSegments.push(count);
  if (rowSegments.length !== segments.length) {
    return false;
  }
  for (let x = 0; x < segments.length; x++) {
    if (segments[x] !== rowSegments[x]) {
      return false;
    }
  }
  return true;
};

export default solution;

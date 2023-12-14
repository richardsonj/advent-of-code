// 477203884005 before line 817
// 6731349704784 too high

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    const [springsStr, segmentsStr] = row.split(" ");
    const springs = springsStr.split("");
    const segments = segmentsStr.split(",").map((val) => +val);
    return {
      springs: [...springs, "?", ...springs, "?", ...springs, "?", ...springs, "?", ...springs],
      segments: [...segments, ...segments, ...segments, ...segments, ...segments],
    };
  });
};

const calculateSolution = (input) => {
  let total = 0;
  let index = 1;
  for (const row of input) {
    console.log(`Starting row ${index++} of ${input.length}: ${row.springs.join("")}`);
    total += fillNextSegment(row.springs, row.segments, {});
  }
  return total;
};

const fillNextSegment = (springs, segments, memo) => {
  if (segments.length === 0) {
    return checkForInvalidChar(springs, springs.length, "#") ? 0 : 1;
  }

  const key = `${springs.join("")},${segments.join(",")}`;
  if (memo[key]) {
    return memo[key];
  }

  const segmentsLength = segments.length - 1 + segments.reduce((a, b) => a + b);
  const availableSpots = springs.length - segmentsLength;

  let total = 0;
  for (let x = 0; x <= availableSpots; x++) {
    if (checkForInvalidChar(springs, x, "#")) break;
    if (checkForInvalidChar(springs, segments[0], ".", x)) continue;
    const offset = x + segments[0];
    if (checkForInvalidChar(springs, 1, "#", offset)) continue;
    total += fillNextSegment(springs.slice(offset + 1), segments.slice(1), memo);
  }
  memo[key] = total;
  return total;
};

function checkForInvalidChar(springs, spotsToCheck, invalidChar, startIndex = 0) {
  for (let next = 0; next < spotsToCheck; next++) {
    if (springs[startIndex + next] === invalidChar) {
      return true;
    }
  }
  return false;
}

export default solution;

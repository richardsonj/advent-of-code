const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => {
    const [, name, id, checksum] = line.match(/((?:[a-z]+-)*[a-z]+)-(\d+)\[([a-z]+)\]/);
    return { name, id, checksum };
  });
};

const calculateSolution = (input) => {
  let total = 0;
  for (const room of input) {
    if (generateCheckSum(room.name) === room.checksum) {
      total += parseInt(room.id);
    }
  }
  return total;
};

const generateCheckSum = (name) => {
  const counts = {};
  for (const char of name.split("")) {
    if (char === "-") {
      continue;
    }
    counts[char] ? counts[char]++ : (counts[char] = 1);
  }
  const letters = Object.keys(counts);
  letters.sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
  return letters.splice(0, 5).join("");
};

export default solution;

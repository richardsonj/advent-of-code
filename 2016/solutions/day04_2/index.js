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
  for (const room of input) {
    if (generateCheckSum(room.name) === room.checksum) {
      const realName = decrypt(room.name, parseInt(room.id));
      if (realName === "northpole object storage") {
        return room.id;
      }
    }
  }
};

const decrypt = (name, id) => {
  return name
    .split("")
    .map((char) => {
      return char === "-" ? " " : String.fromCharCode(((char.charCodeAt(0) - 97 + id) % 26) + 97);
    })
    .join("");
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

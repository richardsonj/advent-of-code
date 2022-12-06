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
  for (let i = 0; i < input.length; i += 3) {
    const elf1 = new Set(input[i].split(""));
    const elf2 = new Set(input[i+1].split(""));
    const elf3 = new Set(input[i+2].split(""));

    const common = [...elf1].filter(item=>elf2.has(item)).filter(item=>elf3.has(item))[0];
    sum+= priority(common);
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
  for (let leftChar of left) {
    for (let rightChar of right) {
      if (leftChar === rightChar) {
        return leftChar;
      }
    }
  }
}

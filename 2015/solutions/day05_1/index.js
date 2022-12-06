import { isNumericDependencies } from "mathjs";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n");
};

const calculateSolution = (input) => {
  return input.filter((word) => isNice(word)).length;
};

const isNice = (word) => {
  let vowels = word
    .split("")
    .filter((char) => ["a", "e", "i", "o", "u"].includes(char)).length;
  let hasDoubleLetter =
    word
      .split("")
      .reduce((acc, curr) => acc === true || (curr === acc ? true : curr)) === true;
  let containsBadString =
    word
      .split("")
      .reduce(
        (acc, curr) =>
          acc === true || (["ab", "cd", "pq", "xy"].includes(acc + curr) ? true : curr)
      ) === true;
  return vowels >= 3 && hasDoubleLetter && !containsBadString;
};

export default solution;

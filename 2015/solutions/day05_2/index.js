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
  let triplets = [];
  let spacedDuplicate = false;
  let doubleDuplicates = false;
  let pairs = {};
  triplets.push(["", word[0], word[1]]);
  for (let x = 0; x < word.length - 2; x++) {
    triplets.push(word.substring(x, x + 3));
  }
  triplets.push([word[word.length - 2], word[word.length - 1], ""]);
  for (let triplet of triplets) {
    if (triplet[0] === triplet[2]) {
      spacedDuplicate = true;
    }
    if (triplet[0] === triplet[2] && triplet[1] === triplet[2]) {
      pairs[triplet[0] + triplet[1]] =
        (pairs[triplet[0] + triplet[1]] || 0) - 2;
    } else {
      pairs[triplet[0] + triplet[1]] =
        (pairs[triplet[0] + triplet[1]] || 0) + 1;
    }
  }
  for (let pair in pairs) {
    if (pairs[pair] >= 2) {
      doubleDuplicates = true;
    }
  }
  return spacedDuplicate && doubleDuplicates;
};

export default solution;

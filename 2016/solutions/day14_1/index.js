import md5 from "md5";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input;
};

const hashMap = {};

const calculateSolution = (input) => {
  let found = 0;
  let index = 0;
  while (found < 64) {
    index++;
    const candidate = generateMd5(input, index);
    const tripletChar = checkCandidateForTriple(candidate);
    if (tripletChar && checkThousandHashes(index, tripletChar, input)) {
      found++;
    }
  }
  return index;
};

const generateMd5 = (salt, seed) => {
  if (!hashMap[seed]) {
    hashMap[seed] = md5(`${salt}${seed}`);
  }
  return hashMap[seed];
};

const checkCandidateForTriple = (candidate) => {
  for (let x = 0; x < candidate.length - 2; x++) {
    if (candidate[x] === candidate[x + 1] && candidate[x + 1] === candidate[x + 2]) {
      return candidate[x];
    }
  }
  return false;
};

const checkThousandHashes = (index, targetChar, salt) => {
  const target = `${targetChar}${targetChar}${targetChar}${targetChar}${targetChar}`;
  for (let x = index + 1; x <= index + 1000; x++) {
    const hash = generateMd5(salt, x);
    if (hash.includes(target)) {
      return true;
    }
  }
  return false;
};

export default solution;

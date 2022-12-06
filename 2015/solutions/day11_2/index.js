const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input;
};

const calculateSolution = (parsedInput) => {
  let password = parsedInput;
  do {
    password = increment(password);
  } while (passwordFails(password));
  return password;
};

const increment = (password) => {
  let splitPass = password.split("");
  for (let x = splitPass.length - 1; x >= 0; x--) {
    splitPass[x] = String.fromCharCode(
      ((splitPass[x].charCodeAt() - 96) % 26) + 97
    );
    if (splitPass[x] !== "a") {
      break;
    }
  }
  return splitPass.join("");
};

const passwordFails = (password) => {
  return (
    !includesStraight(password) ||
    containsIllegalCharacter(password) ||
    !multipleRepeats(password)
  );
};

const includesStraight = (password) => {
  for (let x = 0; x < password.length-2; x++) {
    if (password[x+1].charCodeAt() - password[x].charCodeAt() === 1 && password[x+2].charCodeAt() - password[x+1].charCodeAt() === 1) {
      return true;
    }
  }
  return false;
};

const containsIllegalCharacter = (password) => {
  return (
    password.includes("i") || password.includes("o") || password.includes("l")
  );
};

const multipleRepeats = (password) => {
  let sameIndexes = {};
  for (let x = 0; x < password.length-1; x++) {
    if (password[x] === password[x+1]){
      sameIndexes[x] = password[x];
      sameIndexes[x+1] = password[x+1];
    }
  }

  return Object.keys(sameIndexes).length >= 4;
};

export default solution;

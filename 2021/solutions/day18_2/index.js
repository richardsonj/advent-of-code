const day18_2 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => JSON.parse(line));
};

const calculateSolution = (parsedInput) => {
  let max = 0;
  for (let number1 of parsedInput) {
    for (let number2 of parsedInput.filter((num=> num!==number1))) {
      let result = magnitude(add(copyArray(number1), copyArray(number2)));
      max = Math.max(max, result);
    }
  }

  return max;
};

const copyArray = (array) => {
  if (typeof array === 'number') return array;
  array = [...array];
  for (let e in array) {
    array[e] = copyArray(array[e]);
  }
  return array;
}

const add = (left, right) => {
  let result = [left, right];
  let reduced;
  do {
    reduced = reduce(result, 0);
  } while (reduced);
  return result;
};

const reduce = (number, depth) => {
  let result = checkExplosions(number, depth);
  if (result) return result;
  result = checkSplits(number);
  return result;
};

const checkExplosions = (number, depth) => {
  if (depth >= 4) {
    return number;
  }
  if (typeof number[0] != "number") {
    let result = checkExplosions(number[0], depth + 1);

    if (result) {
      if (result === true) {
        return result;
      }
      if (number[0] === result) {
        number[0] = 0;
        result = [...result];
      }
      if (typeof number[1] === "number") {
        number[1] += result[1];
        result[1] = 0;
        if (result[1] === 0 && result[0] === 0) {
          result = true;
        }
      } else {
        if (typeof number[1] === "number") {
          number[1] += result[1];
          result[1] = 0;
        } else {
          let next = number[1];
          while (typeof next[0] !== "number") {
            next = next[0];
          }
          next[0] += result[1];
          result[1] = 0;
        }
        if (result[1] === 0 && result[0] === 0) {
          result = true;
        }
      }
      return result;
    }
  }
  if (typeof number[1] !== "number") {
    let result = checkExplosions(number[1], depth + 1);

    if (result) {
      if (result === true) {
        return result;
      }
      if (number[1] === result) {
        number[1] = 0;
        result = [...result];
      }
      if (typeof number[1] === "number") {
        number[0] += result[0];
        result[0] = 0;
        if (result[1] === 0 && result[0] === 0) {
          result = true;
        }
      } else {
        if (typeof number[0] === "number") {
          number[0] += result[0];
          result[0] = 0;
        } else {
          let next = number[0];
          while (typeof next[1] !== "number") {
            next = next[1];
          }
          next[1] += result[0];
          result[0] = 0;
        }
        if (result[1] === 0 && result[0] === 0) {
          result = true;
        }
      }
      return result;
    }
  }

  return false;
};

const checkSplits = (number) => {
  if (typeof number[0] !== "number") {
    let result = checkSplits(number[0]);
    if (result) return result;
  } else {
    if (number[0] >= 10) {
      number[0] = [Math.floor(number[0] / 2.0), Math.ceil(number[0] / 2.0)];
      return true;
    }
  }if (typeof number[1] !== "number") {
    let result = checkSplits(number[1]);
    if (result) return result;
  } else {
    if (number[1] >= 10) {
      number[1] = [Math.floor(number[1] / 2.0), Math.ceil(number[1] / 2.0)];
      return true;
    }
  }
  return false;
};

const magnitude = (number) => {
  if (typeof number === 'number') {
    return number;
  }
  return 3*magnitude(number[0]) + 2 * magnitude(number[1]);
}

export default day18_2;

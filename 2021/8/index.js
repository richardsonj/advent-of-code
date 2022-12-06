import fs from "fs";
import readline from "readline";

const fileStream = fs.createReadStream("input.txt");

const processFile = async () => {
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let inputs = [];
  for await (const line of rl) {
    const splitInput = line.split(" | ");
    inputs.push({
      testValues: splitInput[0].split(" "),
      values: splitInput[1].split(" "),
    });
  }

  return inputs;
};

let inputs = await processFile();

var hasAllDigits = true;

let total = 0;

for (let input of inputs) {
  let result = decode(input);
  total += result;
}

console.log(total);

function decode(input) {
  const solved = {};

  let clues = [...input.testValues, ...input.values];
  clues = clues.map((clue) => clue.split("").sort().join(""));
  clues = [...new Set(clues)];
  clues = clues.map((clue) => clue.split(""));
  let ac = [];
  let dg = [];

  for (let segment of ['a', 'b', 'c', 'd', 'e', 'f', 'g']) {
    const numCount = clues.filter((digit) => digit.includes(segment)).length;
    switch (numCount) {
      case 4:
        solved[segment] = 'e';
        break;
      case 6:
        solved[segment] = 'b';
        break;
      case 7:
        dg.push(segment);
        break;
      case 8:
        ac.push(segment);
        break;
      case 9:
        solved[segment] = 'f';
        break;
    }
  }

  let one = clues.filter((clue) => clue.length === 2)[0];
  let four = clues.filter((clue) => clue.length === 4)[0];
  let seven = clues.filter((clue) => clue.length === 3)[0];
  let eight = clues.filter((clue) => clue.length === 7)[0];

  for (let segment of seven) {
    if (!one.includes(segment)) {
      solved[segment] = 'a';
    } 
  }

  for (let segment of ac) {
    if (!Object.keys(solved).includes(segment)) {
      solved[segment] = 'c';
    }
  }

  for (let segment of four) {
    if (!Object.keys(solved).includes(segment)) {
      solved[segment] = 'd';
    }
  }

  for (let segment of dg) {
    if (!Object.keys(solved).includes(segment)) {
      solved[segment] = 'g';
    }
  }

  let resultDigits = input.values;

  let result = ''
  for (let digit of resultDigits) {
    result += translateDigit(digit, solved);
  }

  return parseInt(result);
}

function translateDigit(digit, solved) {
  digit = digit.split("").map((segment)=>solved[segment]).sort().join("");
  switch (digit) {
    case 'abcefg':
      return '0';
    case 'cf':
      return '1';
    case 'acdeg':
      return '2';
    case 'acdfg':
      return '3';
    case 'bcdf':
      return '4';
    case 'abdfg':
      return '5';
    case 'abdefg':
      return '6';
    case 'acf':
      return '7';
    case 'abcdefg':
      return '8';
    case 'abcdfg':
      return '9';
  }
}
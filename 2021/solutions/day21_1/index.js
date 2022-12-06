import { secondRadiationDependencies } from 'mathjs';

const day21_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

let diceRolls = 0;
let diceValue = 0;

const parseInput = (input) => {
  return input.split("\r\n").map((line) => {
    let words = line.split(" ");
    return parseInt(words[words.length-1]);
  });
};

const calculateSolution = (playerPos) => {
  let scores = [0, 0];
  while (true){
    let roll = rollDice();
    playerPos[0] += roll;
    playerPos[0] = ((playerPos[0] -1) % 10) + 1;
    scores[0] += playerPos[0];
    if (scores[0] >= 1000) {
      break;
    }
    roll = rollDice();
    playerPos[1] += roll;
    playerPos[1] = ((playerPos[1] -1) % 10) + 1;
    scores[1] += playerPos[1];
    if (scores[1] >= 1000) {
      break;
    }
  }
  return Math.min(...scores) * diceRolls;
};

const rollDice = () => {
  diceRolls +=3;
  let totalRoll = 0;
  diceValue++;
  totalRoll+=diceValue;
  diceValue %= 100;
  diceValue++;
  totalRoll+=diceValue;
  diceValue %= 100;
  diceValue++;
  totalRoll+=diceValue;
  diceValue %= 100;
return totalRoll;
}

export default day21_1;

import { secondRadiationDependencies } from "mathjs";

const day21_2 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => {
    let words = line.split(" ");
    return parseInt(words[words.length - 1]);
  });
};

const calculateSolution = (playerPos) => {
  let player1 = { score: 0, pos: playerPos[0], roll: 0 };
  let player2 = { score: 0, pos: playerPos[1], roll: 0 };
  return Math.max(...simulateRoll([player1, player2], 3, 0));
};

const memo = {};

const simulateRoll = (players, rollsRemaining, turn) => {
  let key = `${players[0].pos}:${players[0].score}:${players[0].roll}:${players[1].pos}:${players[1].score}:${players[1].roll}:${rollsRemaining}:${turn}`;
  if (memo[key]) {
    return memo[key];
  }
  let winCounts = [0,0];
  for (let roll of [1,2,3]) {
    let currentPlayer = players[turn];
    let nextcurrentPlayer = {...currentPlayer};
    let nextPlayers = [];
    let nextTurn = turn;
    let nextRollsRemaining = rollsRemaining;
    nextPlayers[nextTurn] = nextcurrentPlayer;
    nextPlayers[(nextTurn+1)%2] = {...players[(nextTurn+1)%2]};
    nextcurrentPlayer.roll += roll;
    nextRollsRemaining--;
    if (!nextRollsRemaining) {
      nextcurrentPlayer.pos += nextcurrentPlayer.roll;
      nextcurrentPlayer.pos += nextcurrentPlayer.roll = 0;
      nextcurrentPlayer.pos = ((nextcurrentPlayer.pos - 1) % 10) + 1;
      nextcurrentPlayer.score += nextcurrentPlayer.pos;
      nextRollsRemaining = 3;
      if (nextcurrentPlayer.score >= 21) {
        winCounts[nextTurn]++;
        continue;
      }
      nextTurn = (nextTurn +1) % 2;
    }
    let nextWinCounts =simulateRoll(nextPlayers,nextRollsRemaining, nextTurn);
    winCounts[0] += nextWinCounts[0];
    winCounts[1] += nextWinCounts[1];
  }
  memo[key] = winCounts;
  return winCounts;
};

export default day21_2;

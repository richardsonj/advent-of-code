import fs from "fs";
import readline from "readline";

const fileStream = fs.createReadStream("input.txt");

const processFile = async () => {
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let draws = [];
  let boards = [];
  let firstLine = true;
  let boardStarted = false;
  let boardIndex = 0;
  for await (const line of rl) {
    if (firstLine) {
      draws.push(...line.split(","));
      firstLine = false;
      continue;
    }
    if (line != "") {
      if (!boardStarted) {
        boards.push([]);
        boardStarted = true;
      }
      boards[boardIndex].push(line.trim().split(/\W+/));
    } else {
      if (boardStarted) {
        boardStarted = false;
        boardIndex++;
      }
    }
  }

  return [draws, boards];
};

let [draws, boards] = await processFile();

let winningDraw = 0;
let winningBoard;

//console.log(boards);

for (let draw of draws) {
  markMatches(draw, boards);
  //console.log(boards);
    boards = boards.filter((val) => !checkForWinner(val));
    if (boards.length == 0){
      winningDraw = parseInt(draw);
      break;
    }
    //console.log(boards);
    if (boards.length == 1) {
      winningBoard = boards[0];
    }
}

console.log(
  winningDraw *
    winningBoard.reduce(
      (prev, row) =>
        prev +
        row.reduce((prev, digit) => (digit ? prev + parseInt(digit) : prev), 0),
      0
    )
);

function checkForWinner(board) {
  for (let r = 0; r < 5; r++) {
    let winner = true;
    for (let c = 0; c < 5; c++) {
      if (board[r][c] !== "") {
        winner = false;
      }
    }
    if (winner) {
      return winner;
    }
  }
  for (let c = 0; c < 5; c++) {
    let winner = true;
    for (let r = 0; r < 5; r++) {
      if (board[r][c] !== "") {
        winner = false;
      }
    }
    if (winner) {
      return winner;
    }
  }
  return false;
}

function markMatches(draw, boards) {
  for (let b = 0; b < boards.length; b++) {
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (boards[b][r][c] == draw) {
          boards[b][r][c] = "";
        }
      }
    }
  }
}

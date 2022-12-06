import { ObjectNodeDependencies } from "mathjs";
import Node from "../../Node.js";

const day23_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

let bestScore = Infinity;

const parseInput = (input) => {
  let lines = input.split("\r\n");
  let roomA = [lines[2][3], lines[3][3]];
  let roomB = [lines[2][5], lines[3][5]];
  let roomC = [lines[2][7], lines[3][7]];
  let roomD = [lines[2][9], lines[3][9]];

  return { A: roomA, B: roomB, C: roomC, D: roomD };
};

const calculateSolution = (rooms) => {
  let hall = ["", "", "", "", "", "", "", "", "", "", ""];
  return simulateMove(hall, rooms, 0);
};

const simulateMove = (hall, rooms, score) => {
  let moves = possibleMoves(hall, rooms);
  if (
    moves.length === 0 &&
    rooms["A"][0] === "A" &&
    rooms["A"][1] === "A" &&
    rooms["B"][0] === "B" &&
    rooms["B"][1] === "B" &&
    rooms["C"][0] === "C" &&
    rooms["C"][1] === "C" &&
    rooms["D"][0] === "D" &&
    rooms["D"][1] === "D"
  ) {
    return bestScore = Math.min(bestScore, score);
  }
  for (let move of moves) {
    if (score + move[1] >= bestScore){
      continue;
    } 
    let [newHall, newRooms] = applyMove(hall, rooms, move);
    simulateMove(newHall, newRooms, score + move[1]);
  }
};

const applyMove = (hall, rooms, move) => {
  let newHall = [...hall];
  let newRooms = { ...rooms };
  for (let room in newRooms) {
    newRooms[room] = [...newRooms[room]];
  }
  let [startPos, endPos] = move[0].split("-");
  let charToMove;

  if (startPos.startsWith("H")) {
    let hallIndex = parseInt(startPos.slice(1));
    charToMove = hall[hallIndex];
    newHall[hallIndex] = "";
  } else {
    let [roomIndex, roomSlot] = startPos.slice(1).split(":");
    charToMove = rooms[roomIndex][roomSlot];
    newRooms[roomIndex][roomSlot] = "";
  }
  if (endPos.startsWith("H")) {
    let hallIndex = parseInt(endPos.slice(1));
    newHall[hallIndex] = charToMove;
  } else {
    let [roomIndex, roomSlot] = endPos.slice(1).split(":");
    newRooms[roomIndex][roomSlot] = charToMove;
  }

  return [newHall, newRooms];
};

const roomMeetings = { A: 2, B: 4, C: 6, D: 8 };
const scoreMultipliers = { A: 1, B: 10, C: 100, D: 1000 };

const possibleMoves = (hall, rooms) => {
  const moves = [];
  for (let hallIndex = 0; hallIndex < hall.length; hallIndex++) {
    if (Object.values(roomMeetings).includes(hallIndex)) {
      continue;
    }
    for (let roomIndex of ["A", "B", "C", "D"]) {
      if (
        rooms[roomIndex][0] === roomIndex &&
        rooms[roomIndex][1] === roomIndex
      ) {
        continue;
      }
      for (let roomSlot = 0; roomSlot < 2; roomSlot++) {
        let moveKey;
        let charToMove;
        if (
          rooms[roomIndex][roomSlot] &&
          (roomSlot !== 1 || !rooms[roomIndex][0]) &&
          !hall[hallIndex]
        ) {
          if (roomSlot === 1 && rooms[roomIndex][1] === roomIndex) {
            continue;
          }
          moveKey = `R${roomIndex}:${roomSlot}-H${hallIndex}`;
          charToMove = rooms[roomIndex][roomSlot];
        } else if (
          hall[hallIndex] &&
          roomIndex === hall[hallIndex] &&
          !rooms[roomIndex][0] &&
          !rooms[roomIndex][roomSlot] &&
          !(rooms[roomIndex][1] && rooms[roomIndex][1] !== roomIndex) &&
          !(roomSlot === 0 && rooms[roomIndex][1] === "")
        ) {
          moveKey = `H${hallIndex}-R${roomIndex}:${roomSlot}`;
          charToMove = hall[hallIndex];
        } else {
          continue;
        }
        let hallEntry = roomMeetings[roomIndex];

        let shouldContinue = false;
        for (
          let x = Math.min(hallEntry, hallIndex);
          x <= Math.max(hallEntry, hallIndex);
          x++
        ) {
          if (x !== hallIndex && hall[x] !== "") {
            shouldContinue = true;
            break;
          }
        }
        if (shouldContinue) {
          continue;
        }
        moves.push([
          moveKey,
          (roomSlot + 1 + Math.abs(hallEntry - hallIndex)) *
            scoreMultipliers[charToMove],
        ]);
      }
    }
  }
  return moves;
};

export default day23_1;

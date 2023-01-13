import md5 from "md5";
import Queue from "../../Queue.js";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input;
};

const calculateSolution = (input) => {
  const unvisited = new Queue();
  unvisited.add({ pos: [0, 0], path: [] });

  const directionMap = { U: [0, -1], D: [0, 1], L: [-1, 0], R: [1, 0] };

  while (unvisited.length) {
    const node = unvisited.remove();
    const hash = md5(`${input}${node.path.join("")}`);
    const openDirections = findOpenDirections(hash);
    for (const direction of openDirections) {
      const directionVector = directionMap[direction];
      const newPos = [node.pos[0] + directionVector[0], node.pos[1] + directionVector[1]];
      if (newPos[0] >= 0 && newPos[1] >= 0 && newPos[0] < 4 && newPos[1] < 4) {
        if (newPos[0] === 3 && newPos[1] === 3) {
          return [...node.path, direction].join("");
        }
        unvisited.add({ pos: newPos, path: [...node.path, direction] });
      }
    }
  }
  return undefined;
};

const findOpenDirections = (hash) => {
  const openDirections = [];
  if (parseInt(hash[0], 16) > 10) {
    openDirections.push("U");
  }
  if (parseInt(hash[1], 16) > 10) {
    openDirections.push("D");
  }
  if (parseInt(hash[2], 16) > 10) {
    openDirections.push("L");
  }
  if (parseInt(hash[3], 16) > 10) {
    openDirections.push("R");
  }
  return openDirections;
};

export default solution;

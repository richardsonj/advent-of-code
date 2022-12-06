import { permutationsDependencies } from "mathjs";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => parseInt(line));
};

const calculateSolution = (containers) => {
  let result = {};
  permute(containers, 0, 0, result);
  let keys = Object.keys(result).map(val=>parseInt(val));
  keys.sort((a,b)=>a-b);
  return result[keys[0]];
};

const permute = (containers, total, containersUsed, solutions) => {
  if (total === 150) {
    solutions[containersUsed] = (solutions[containersUsed] || 0) + 1;
  }
  if (total > 150 || containers.length === 0) {
    return;
  }
  for (let containerIndex in containers) {
    let newContainers = [...containers];
    newContainers.splice(0, parseInt(containerIndex) + 1);
    permute(
      newContainers,
      total + containers[containerIndex],
      containersUsed + 1,
      solutions
    );
  }
  return;
};

export default solution;

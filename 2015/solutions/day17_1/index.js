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
  return permute(containers, 0);
};

const permute = (containers, total) => {
  if (total === 150) {
    return 1;
  }
  if (total > 150 || containers.length === 0) {
    return 0;
  }
  let sum = 0;
  for (let containerIndex in containers) {
    let newContainers =  [...containers];
    newContainers.splice(0,parseInt(containerIndex)+1);
    sum += permute(newContainers, total + containers[containerIndex]);
  }
  return sum;
};

export default solution;

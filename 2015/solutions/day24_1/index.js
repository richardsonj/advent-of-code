import { sum } from "mathjs";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((val) => parseInt(val));
};

const calculateSolution = (presents) => {
  let target = presents.reduce((acc, curr) => acc + curr) / 3;

  return findOptimalGroupOfTarget(target, presents).reduce((a, b) => a * b);
};

const findOptimalGroupOfTarget = (
  target,
  presents,
  group = [],
  lastIndex = presents.length,
  optimal = undefined
) => {
  for (let x = lastIndex - 1; x >= 0; x--) {
    let newPresents = [...presents];
    let newGroup = [...group];
    newGroup.push(presents[x]);
    if (optimal && newGroup.length > optimal.length) {
      return undefined;
    }

    newPresents.splice(x, 1);
    if (sum(...newGroup) === target) {
      if (canTotalTarget(newPresents, target)) {
        optimal = getOptimal(newGroup, optimal);
      }
      continue;
    }
    if (sum(...newGroup) > target) {
      continue;
    }

    optimal = getOptimal(
      optimal,
      findOptimalGroupOfTarget(target, newPresents, newGroup, x, optimal)
    );
  }
  return optimal;
};

const canTotalTarget = (presents, target, group = []) => {
  for (let x = presents.length-1; x >= 0; x--) {
    let newPresents = [...presents];
    let newGroup = [...group];
    newGroup.push(presents[x]);
    newPresents.splice(x, 1);
    if (sum(...newGroup) === target) {
      return true;
    }
    if (sum(...newGroup) > target) {
      continue;
    }
    if (canTotalTarget(newPresents, target, newGroup)) {
      return true;
    }
  }
  return false;
};

const getOptimal = (group1, group2) => {
  if (!group1) {
    return group2 ? [...group2] : group2;
  }
  if (!group2) {
    return group1 ? [...group1] : group1;
  }
  if (group1.length === group2.length) {
    return group1.reduce((a, b) => a * b) < group2.reduce((a, b) => a * b)
      ? [...group1]
      : [...group2];
  }
  if (group1.length < group2.length) {
    return [...group1];
  }
  return [...group2];
};

export default solution;

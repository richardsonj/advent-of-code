import { distance } from 'mathjs';

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").reduce((acc, line) => {
    const [loc1, , loc2, , dist] = line.split(" ");
    let intDist = parseInt(dist);
    let loc1Data = acc[loc1] || {};
    loc1Data[loc2] = intDist;
    let loc2Data = acc[loc2] || {};
    loc2Data[loc1] = intDist;
    acc[loc1] = loc1Data;
    acc[loc2] = loc2Data;
    return acc;
  },{});
};

const calculateSolution = (parsedInput) => {
  const memo = {};
  let locations = Object.keys(parsedInput);
  let minDistance = traverse(locations, undefined, parsedInput);
  return minDistance;
};

function traverse(locations, prev, distances) {
  if (locations.length === 0) {
    return 0;
  }
  let maxDistance = 0;
  for (let startingLocation of locations) {
    let distance = 0;
    if (prev) {
      distance += distances[prev][startingLocation];
    }
    let newLocations = locations.filter(loc => loc !== startingLocation);
    distance += traverse(newLocations, startingLocation, distances);
    maxDistance = Math.max(maxDistance, distance);
  }
  return maxDistance;
}
export default solution;



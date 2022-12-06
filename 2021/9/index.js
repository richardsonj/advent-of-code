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
    inputs.push(line.split("").map((x) => parseInt(x)));
  }

  return inputs;
};

let inputs = await processFile();

let sum = 0;
let basins = [];

for (let x = 0; x < inputs.length; x++) {
  for (let y = 0; y < inputs[x].length; y++) {
    let current = inputs[x][y];
    let up = inputs[x - 1]?.[y];
    if (up === undefined) up = Infinity;
    let down = inputs[x + 1]?.[y];
    if (down === undefined) down = Infinity;
    let left = inputs[x]?.[y - 1];
    if (left === undefined) left = Infinity;
    let right = inputs[x]?.[y + 1];
    if (right === undefined) right = Infinity;

    let low =
      up > current && down > current && left > current && right > current;

    if (low) {
      sum += inputs[x][y] + 1;
      let basinSize = findBasin(inputs, x, y);
      basins.push(basinSize);
    }
  }
}

let total = basins.sort((a,b) => b - a).slice(0,3).reduce((a,b)=> a*b);
console.log(total);

function findBasin(inputs, x, y) {
  let pointReferences = createPointReferences(inputs);
  let points = [pointReferences[x][y]];
  points = findBasinPoints(inputs, x, y, points, pointReferences);
  return points.length;
}

function findBasinPoints(inputs, x, y, points, pointReferences) {
  let current = inputs[(x, y)];
  let up = inputs[x - 1]?.[y];
  if (up === undefined) up = 9;
  let down = inputs[x + 1]?.[y];
  if (down === undefined) down = 9;
  let left = inputs[x]?.[y - 1];
  if (left === undefined) left = 9;
  let right = inputs[x]?.[y + 1];
  if (right === undefined) right = 9;

  if (
    up !== 9 &&
    pointReferences[x - 1]?.[y] &&
    !points.includes(pointReferences[x - 1]?.[y])
  ) {
    points.push(pointReferences[x - 1][y]);
    points = findBasinPoints(inputs, x - 1, y, points, pointReferences);
  }
  if (
    down !== 9 &&
    pointReferences[x + 1]?.[y] &&
    !points.includes(pointReferences[x + 1]?.[y])
  ) {
    points.push(pointReferences[x + 1][y]);
    points = findBasinPoints(inputs, x + 1, y, points, pointReferences);
  }
  if (
    left !== 9 &&
    pointReferences[x]?.[y - 1] &&
    !points.includes(pointReferences[x]?.[y - 1])
  ) {
    points.push(pointReferences[x][y - 1]);
    points = findBasinPoints(inputs, x, y - 1, points, pointReferences);
  }
  if (
    right !== 9 &&
    pointReferences[x]?.[y + 1] &&
    !points.includes(pointReferences[x]?.[y + 1])
  ) {
    points.push(pointReferences[x][y + 1]);
    points = findBasinPoints(inputs, x, y + 1, points, pointReferences);
  }

  return points;
}

function createPointReferences(inputs) {
  let pointReferences = [];
  for (let x = 0; x < inputs.length; x++) {
    pointReferences.push([]);
    for (let y = 0; y < inputs[x].length; y++) {
      pointReferences[x].push({ x, y });
    }
  }
  return pointReferences;
}

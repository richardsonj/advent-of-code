import fs from "fs";
import readline from "readline";

const fileStream = fs.createReadStream("input.txt");

const processFile = async () => {
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const lines = [];

  for await (const line of rl) {
    const ends = line.split(" -> ");
    lines.push({ start: ends[0].split(","), end: ends[1].split(",") });
  }

  return lines;
};

let lines = await processFile();

const intersections = [];
for (let i = 0; i < 1000; i++) {
  let cells = [];
  for (let j = 0; j < 1000; j++) {
    cells.push(0);
  }
  intersections.push(cells);
}

for (let line of lines) {
  if (line.start[0] === line.end[0]) {
    for (
      let y = Math.min(line.start[1], line.end[1]);
      y <= Math.max(line.start[1], line.end[1]);
      y++
    ) {
      intersections[line.start[0]][y]++;
    }
  } else if (line.start[1] === line.end[1]) {
    for (
      let x = Math.min(line.start[0], line.end[0]);
      x <= Math.max(line.start[0], line.end[0]);
      x++
    ) {
      intersections[x][line.start[1]]++;
    }
  } else if (
    (line.start[0] - line.end[0]) * (line.start[1] - line.end[1]) >
    0
  ) {
    for (
      let y = Math.min(line.start[1], line.end[1]),
        x = Math.min(line.start[0], line.end[0]);
      y <= Math.max(line.start[1], line.end[1]);
      y++, x++
    ) {
      intersections[x][y]++;
    }
  } else {
    for (
      let y = Math.max(line.start[1], line.end[1]),
        x = Math.min(line.start[0], line.end[0]);
      y >= Math.min(line.start[1], line.end[1]);
      y--, x++
    ) {
      intersections[x][y]++;
    }
  }
}

let count = 0;
for (let row of intersections) {
  for (let cell of row) {
    if (cell > 1) {
      count++;
    }
  }
}
console.log(count);

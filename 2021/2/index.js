import fs from "fs";
import readline from "readline";

const fileStream = fs.createReadStream("input.txt");

const processFile = async () => {
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let depth = 0;
  let distance = 0;
  let aim = 0;

  for await (const line of rl) {
    let [direction, dist] = line.split(" ");
    dist = parseInt(dist);
    console.log(direction);
    console.log(dist);
    switch (direction) {
      case "up":
        aim -= dist;
        break;
      case "down":
        aim += dist;
        break;
      case "forward":
        distance += dist;
        depth += (dist * aim);
    }
  }
  return depth*distance;
};

const count = await processFile();
console.log(count);

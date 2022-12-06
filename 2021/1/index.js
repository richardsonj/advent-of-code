import fs from "fs";
import readline from "readline";

const fileStream = fs.createReadStream("input.txt");

const processFile = async () => {
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let count = 0;
  let last = Infinity;

  let depths = [0,0,0]
  let iteration = 0;

  for await (const line of rl) {
    let depth = parseInt(line);
    depths[iteration % 3] = depth
    iteration++;
    if (iteration < 3) {
      continue;
    } 
    console.log(depths);
    const total = depths.reduce((a, b) => a+b, 0);
    console.log(total);
  
    if (total > last) count++;
    last = total;
  }
  return count;
};

const count = await processFile();
console.log(count);
import fs from "fs";
import readline from "readline";

const fileStream = fs.createReadStream("input.txt");

const processFile = async () => {
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const fish = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  for await (const line of rl) {
    for (let item of line.split(',')) {
      fish[parseInt(item)]++;
    }
  }

  return fish;
};

let fish = await processFile();

for (let i = 0; i < 256; i++){
  fish = simulateDay(fish);
}

console.log(fish);

console.log(fish.reduce((x,y)=>x+y));


function simulateDay(fish){
  let newFish = [];
  newFish.push(fish[1]);
  newFish.push(fish[2]);
  newFish.push(fish[3]);
  newFish.push(fish[4]);
  newFish.push(fish[5]);
  newFish.push(fish[6]);
  newFish.push(fish[7]);
  newFish.push(fish[8]);
  newFish.push(fish[0]);
  newFish[6] += fish[0];
  return newFish;
}
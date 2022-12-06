import { fileLoader } from "./fileloader.js";
import { millisToHours } from "./DateUtil.js";
import day10_1 from "./solutions/day10_1/index.js";
import day10_2 from "./solutions/day10_2/index.js";
import day11_1 from "./solutions/day11_1/index.js";
import day11_2 from "./solutions/day11_2/index.js";
import day12_1 from "./solutions/day12_1/index.js";
import day12_2 from "./solutions/day12_2/index.js";
import day13_1 from "./solutions/day13_1/index.js";
import day13_2 from "./solutions/day13_2/index.js";
import day14_1 from "./solutions/day14_1/index.js";
import day14_2 from "./solutions/day14_2/index.js";
import day15_1 from "./solutions/day15_1/index.js";
import day15_2 from "./solutions/day15_2/index.js";
import day16_1 from "./solutions/day16_1/index.js";
import day16_2 from "./solutions/day16_2/index.js";
import day17_1 from "./solutions/day17_1/index.js";
import day17_2 from "./solutions/day17_2/index.js";
import day18_1 from "./solutions/day18_1/index.js";
import day18_2 from "./solutions/day18_2/index.js";
import day19_1 from "./solutions/day19_1/index.js";
import day19_2 from "./solutions/day19_2/index.js";
import day20_1 from "./solutions/day20_1/index.js";
import day20_2 from "./solutions/day20_2/index.js";
import day21_1 from "./solutions/day21_1/index.js";
import day21_2 from "./solutions/day21_2/index.js";
import day22_1 from "./solutions/day22_1/index.js";
import day22_2 from "./solutions/day22_2/index.js";
import day23_1 from "./solutions/day23_1/index.js";
import day23_2 from "./solutions/day23_2/index.js";
import day24_1 from "./solutions/day24_1/index.js";
import day24_2 from "./solutions/day24_2/index.js";
import day25_1 from "./solutions/day25_1/index.js";
import day25_2 from "./solutions/day25_2/index.js";

var args = process.argv.slice(2);

let solutions = {
  day10_1,
  day10_2,
  day11_1,
  day11_2,
  day12_1,
  day12_2,
  day13_1,
  day13_2,
  day14_1,
  day14_2,
  day15_1,
  day15_2,
  day16_1,
  day16_2,
  day17_1,
  day17_2,
  day18_1,
  day18_2,
  day19_1,
  day19_2,
  day20_1,
  day20_2,
  day21_1,
  day21_2,
  day22_1,
  day22_2,
  day23_1,
  day23_2,
  day24_1,
  day24_2,
  day25_1,
  day25_2,
};

let start = new Date();

if (args[1] == "test") {
  var file = `./solutions/${args[0]}/test-input.txt`;
} else {
  var file = `./solutions/${args[0]}/input.txt`;
}

let sol = solutions[args[0]].solve(fileLoader.loadFile(file));
let end = new Date();
console.log(sol);
console.log(`Time to Complete: ${(millisToHours(end-start))}`);

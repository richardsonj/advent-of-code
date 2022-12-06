import fs from "fs";
import readline from "readline";

const fileStream = fs.createReadStream("input.txt");

const processFile = async () => {
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let lineCount = 0;
  const lines = [];
  for await (const line of rl) {
    lines.push(line);
  }
  let index = 0;
  let array1 = lines;
  while (array1.length > 1 && index < array1[0].length) {
    const digitCounts = getDigitCounts(array1);
    console.log(digitCounts)
    array1 = array1.filter((value) => {
      return (
        value[index] ==
        (digitCounts[index][0] - digitCounts[index][1] > 0 ? "0" : "1")
      );
    });
    console.log(array1);
    index++;
  }

  index = 0;
  let array2 = lines;
  while (array2.length > 1 && index < array2[0].length) {
    const digitCounts = getDigitCounts(array2);
    console.log(digitCounts)
    array2 = array2.filter((value) => {
      return (
        value[index] ==
        (digitCounts[index][0] - digitCounts[index][1] <= 0 ? "0" : "1")
      );
    });
    console.log(array2);
    index++;
  }

  return parseInt(array1[0], 2) * parseInt(array2[0], 2);
};

const count = await processFile();
console.log(count);


function getDigitCounts(array1) {
  let digitCounts = [];
  for (let line of array1) {
    let digitIndex = 0;
    for (let digit of line) {
      if (digitCounts.length - 1 < digitIndex) {
        digitCounts.push([0, 0]);
      }
      digitCounts[digitIndex][digit]++;
      digitIndex++;
    }
  }
  return digitCounts;
}

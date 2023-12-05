const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n");
};

const calculateSolution = (input) => {
  let total = 0;
  for (const row of input) {
    const match = row.match(/([0-9]|one|two|three|four|five|six|seven|eight|nine)/g);
    console.log(JSON.stringify(match, undefined, 2));
    //   let copy = row;
    //   while (
    //     !copy.startsWith("1") &&
    //     !copy.startsWith("2") &&
    //     !copy.startsWith("3") &&
    //     !copy.startsWith("4") &&
    //     !copy.startsWith("5") &&
    //     !copy.startsWith("6") &&
    //     !copy.startsWith("7") &&
    //     !copy.startsWith("8") &&
    //     !copy.startsWith("9") &&
    //     !copy.startsWith("one") &&
    //     !copy.startsWith("two") &&
    //     !copy.startsWith("three") &&
    //     !copy.startsWith("four") &&
    //     !copy.startsWith("five") &&
    //     !copy.startsWith("six") &&
    //     !copy.startsWith("seven") &&
    //     !copy.startsWith("eight") &&
    //     !copy.startsWith("nine")
    //   ) {
    //     copy = copy.split("").slice(1).join("");
    //   }
    //   if (copy.startsWith("one")) {
    //     total += 10;
    //   } else if (copy.startsWith("two")) {
    //     total += 20;
    //   } else if (copy.startsWith("three")) {
    //     total += 30;
    //   } else if (copy.startsWith("four")) {
    //     total += 40;
    //   } else if (copy.startsWith("five")) {
    //     total += 50;
    //   } else if (copy.startsWith("six")) {
    //     total += 60;
    //   } else if (copy.startsWith("seven")) {
    //     total += 70;
    //   } else if (copy.startsWith("eight")) {
    //     total += 80;
    //   } else if (copy.startsWith("nine")) {
    //     total += 90;
    //   } else {
    //     total += +copy.split("")[0] * 10;
    //   }

    //   while (
    //     !copy.endsWith("1") &&
    //     !copy.endsWith("2") &&
    //     !copy.endsWith("3") &&
    //     !copy.endsWith("4") &&
    //     !copy.endsWith("5") &&
    //     !copy.endsWith("6") &&
    //     !copy.endsWith("7") &&
    //     !copy.endsWith("8") &&
    //     !copy.endsWith("9") &&
    //     !copy.endsWith("one") &&
    //     !copy.endsWith("two") &&
    //     !copy.endsWith("three") &&
    //     !copy.endsWith("four") &&
    //     !copy.endsWith("five") &&
    //     !copy.endsWith("six") &&
    //     !copy.endsWith("seven") &&
    //     !copy.endsWith("eight") &&
    //     !copy.endsWith("nine")
    //   ) {
    //     copy = copy.split("").slice(0, -1).join("");
    //   }
    //   if (copy.endsWith("one")) {
    //     total += 1;
    //   } else if (copy.endsWith("two")) {
    //     total += 2;
    //   } else if (copy.endsWith("three")) {
    //     total += 3;
    //   } else if (copy.endsWith("four")) {
    //     total += 4;
    //   } else if (copy.endsWith("five")) {
    //     total += 5;
    //   } else if (copy.endsWith("six")) {
    //     total += 6;
    //   } else if (copy.endsWith("seven")) {
    //     total += 7;
    //   } else if (copy.endsWith("eight")) {
    //     total += 8;
    //   } else if (copy.endsWith("nine")) {
    //     total += 9;
    //   } else {
    //     total += +copy.split("")[copy.length - 1];
    //   }
  }
  return total;
};

export default solution;

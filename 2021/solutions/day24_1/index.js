const day24_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => line.split(" "));
};

const calculateSolution = (instructions) => {
  let input = [9, 1, 8, 1, 1, 2, 4, 1, 9, 1, 1, 6, 4, 1];
  let registers = runProgram(instructions, input);
  if (!registers.z) {
    return input.map((val) => toString(val)).join("");
  }
};

function max(left, right) {
  for (let x = 0; x < 14; x++) {
    if (left[x] > right[x]) {
      return left;
    }
    if (left[x] < right[x]) {
      return right;
    }
  }
  return left;
}

function runProgram(instructions, input) {
  let inputIndex = 0;
  let registerNames = ["w", "x", "y", "z"];
  let registers = { w: 0, x: 0, y: 0, z: 0 };
  let iteration = 1;
  for (let instruction of instructions) {
    let [command, ...rest] = instruction;

    switch (command) {
      case "inp":
        registers[rest[0]] = input[inputIndex++];
        console.log("");
        console.log(`Iteration ${iteration++}`);
        console.log("____________________");
        break;
      case "add":
        registers[rest[0]] += registerNames.includes(rest[1])
          ? registers[rest[1]]
          : parseInt(rest[1]);
        break;
      case "mul":
        registers[rest[0]] *= registerNames.includes(rest[1])
          ? registers[rest[1]]
          : parseInt(rest[1]);
        break;
      case "div":
        registers[rest[0]] /= registerNames.includes(rest[1])
          ? registers[rest[1]]
          : parseInt(rest[1]);
        registers[rest[0]] =
          Math.sign(registers[rest[0]]) *
          Math.floor(Math.abs(registers[rest[0]]));
        break;
      case "mod":
        registers[rest[0]] %= registerNames.includes(rest[1])
          ? registers[rest[1]]
          : parseInt(rest[1]);
        break;
      case "eql":
        registers[rest[0]] =
          registers[rest[0]] ===
          (registerNames.includes(rest[1])
            ? registers[rest[1]]
            : parseInt(rest[1]))
            ? 1
            : 0;
        break;
    }

    console.log(instruction.join(" "));
    console.log(registers);
  }
  return registers;
}

export default day24_1;

import Computer from "../../Computer.js"

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n");
};

const calculateSolution = (parsedInput) => {
  let instructionSet = {
    hlf: (registers, params) => {
      registers[params[0]] /= 2;
      return 1;
    },
    tpl: (registers, params) => {
      registers[params[0]] *= 3;
      return 1;
    },
    inc: (registers, params) => {
      registers[params[0]]++;
      return 1;
    },
    jmp: (registers, params) => {
      return parseInt(params[0]);
    },
    jie: (registers, params) => {
      if (registers[params[0]] % 2 === 0) {
        return parseInt(params[1]);
      } else {
        return 1;
      }
    },
    jio: (registers, params) => {
      if (registers[params[0]] === 1) {
        return parseInt(params[1]);
      } else {
        return 1;
      }
    },
  };
  let registers = ["a", "b"];
  let instructionParser = (inst) => {
    return inst.split(" ").map(val=>val.replace(/(?:\,|\+)/, ""));
  };
  let computer = new Computer(instructionSet, registers, instructionParser);
  computer.registers.a = 1;

  return computer.process(parsedInput).b;
};

export default solution;

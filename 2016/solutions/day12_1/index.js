import Computer from "../../Computer.js";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n");
};

const calculateSolution = (input) => {
  const instructionParser = (inst) => inst.split(" ");
  const instructionSet = {
    cpy: (registers, params) => {
      registers[params[1]] = Number.isInteger(parseInt(params[0]))
        ? parseInt(params[0])
        : registers[params[0]];
      return 1;
    },
    inc: (registers, params) => {
      registers[params[0]]++;
      return 1;
    },
    dec: (registers, params) => {
      registers[params[0]]--;
      return 1;
    },
    jnz: (registers, params) => {
      return (Number.isInteger(parseInt(params[0]))
        ? parseInt(params[0])
        : registers[params[0]]) !== 0
        ? parseInt(params[1])
        : 1;
    },
  };
  const registers = ["a", "b", "c", "d"];
  const computer = new Computer(instructionSet, registers, instructionParser);
  computer.process(input);
  return computer.registers.a;
};

export default solution;

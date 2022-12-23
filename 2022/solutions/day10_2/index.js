const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) =>
  input.split("\n").map((row) => (row === "noop" ? 0 : parseInt(row.split(" ")[1])));

const calculateSolution = (input) => {
  let cycle = 1;
  let index = -1;
  let sum = 1;
  const crt = [];
  for (let x = 0; x < 6; x++) {
    crt.push(new Array(40).fill("."));
  }
  while (cycle <= 240) {
    const row = Math.floor((cycle - 1) / 40);
    const column = (cycle - 1) % 40;
    if (Math.abs(sum - column) <= 1) {
      crt[row][column] = "#";
    }
    if (index >= 0) {
      sum += input[index];
      if (input[index]) {
        cycle++;
        const row = Math.floor((cycle - 1) / 40);
        const column = (cycle - 1) % 40;
        if (Math.abs(sum - column) <= 1) {
          crt[row][column] = "#";
        }
      }
    }

    index++;
    cycle++;
  }
  return crt.map((row) => row.join("")).join("\n");
};

export default solution;

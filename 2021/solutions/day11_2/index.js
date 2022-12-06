const day11_2 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input
    .split("\r\n")
    .map((row) => row.split("").map((val) => parseInt(val)));
};

const calculateSolution = (parsedInput) => {
  //console.log(parsedInput);
  let count = 0;
  let step = 0;
  while (count !== 100) {
    count = simulate(parsedInput);
    step+=1;
  } 

  console.log(parsedInput.map((value) => value.join(" ")));
  console.log(step);
};

const simulate = (input) => {
  let incremented = false;
  let count = 0;
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      input[x][y]++;
    }
  }

  do {
    incremented = false;
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (input[x][y] > 9 && input[x][y] !== Infinity) {
          input[x][y] = Infinity;
          incrementNeighbor(input, x - 1, y);
          incrementNeighbor(input, x - 1, y - 1);
          incrementNeighbor(input, x - 1, y + 1);
          incrementNeighbor(input, x + 1, y);
          incrementNeighbor(input, x + 1, y - 1);
          incrementNeighbor(input, x + 1, y + 1);
          incrementNeighbor(input, x, y - 1);
          incrementNeighbor(input, x, y + 1);
          incremented = true;
        }
      }
    }
  } while (incremented);

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (input[x][y] === Infinity) {
        input[x][y] = 0;
        count++;
      }
    }
  }
  return count;
};

const incrementNeighbor = (input, x, y) => {
  if (input[x]?.[y] !== undefined) input[x][y]++;
};

export default day11_2;

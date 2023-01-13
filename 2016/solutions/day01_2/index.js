const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split(", ");
};

const calculateSolution = (input) => {
  let x = 0;
  let y = 0;
  let direction = 0;
  const visited = [`${x}:${y}`];
  for (const dir of input) {
    if (dir.substring(0, 1) === "L") {
      direction--;
    } else {
      direction++;
    }
    direction += 4;
    direction %= 4;
    const distance = parseInt(dir.substring(1));
    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case 0:
          y--;
          break;
        case 1:
          x++;
          break;
        case 2:
          y++;
          break;
        case 3:
          x--;
          break;
      }
      if (visited.includes(`${x}:${y}`)) {
        return Math.abs(x) + Math.abs(y);
      }
      visited.push(`${x}:${y}`);
    }
  }

  return 0;
};

export default solution;

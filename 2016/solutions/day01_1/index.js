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
  for (let dir of input) {
    if (dir.substring(0, 1) === "L") {
      direction--;
    } else {
      direction++;
    }
    direction += 4;
    direction %= 4;
    let distance = parseInt(dir.substring(1));
    switch (direction) {
      case 0:
        y -= distance;
        break;
      case 1:
        x += distance;
        break;
      case 2:
        y += distance;
        break;
      case 3:
        x -= distance;
        break;
    }
  }

  return Math.abs(x) + Math.abs(y);
};

export default solution;

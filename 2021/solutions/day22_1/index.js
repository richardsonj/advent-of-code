const day22_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => {
    const [command, box] = line.split(" ");
    return {
      command,
      ...box.split(",").reduce((acc, curr) => {
        const [axis, edges] = curr.split("=");
        acc[axis] = edges.split("..").map((num) => parseInt(num));
        return acc;
      }, {}),
    };
  });
};

const calculateSolution = (parsedInput) => {
  parsedInput.reverse();
  let visited = {};
  let onCount = 0;
  for (let step of parsedInput) {
    if (
      isOutOfBounds(step.x) ||
      isOutOfBounds(step.y) ||
      isOutOfBounds(step.z) 
    ) {
      continue;
    }

    for (let x = step.x[0]; x <= step.x[1]; x++) {
      for (let y = step.y[0]; y <= step.y[1]; y++) {
        for (let z = step.z[0]; z <= step.z[1]; z++) {
          let visitedKey = `${x}:${y}:${z}`;
          if (!visited[visitedKey]) {
            visited[visitedKey] = true;
            if (step.command ==='on') {
              onCount++;
            }
          }
        }
      }
    }
  }
  return onCount;
};

const isOutOfBounds = (coords) => {
  return (
    (coords[0] < -50 && coords[1] < -50) || (coords[0] > 50 && coords[1] > 50)
  );
};

export default day22_1;

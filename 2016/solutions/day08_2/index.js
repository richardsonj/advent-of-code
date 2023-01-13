const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map((line) => {
    let match = line.match(/rect (\d*)x(\d*)/);
    if (match) {
      return { type: "rect", x: parseInt(match[1]), y: parseInt(match[2]) };
    }
    match = line.match(/rotate column x=(\d*) by (\d*)/);
    if (match) {
      return {
        type: "rotate",
        col: parseInt(match[1]),
        amount: parseInt(match[2]),
      };
    }
    match = line.match(/rotate row y=(\d*) by (\d*)/);
    if (match) {
      return {
        type: "rotate",
        row: parseInt(match[1]),
        amount: parseInt(match[2]),
      };
    }
  });
};

const calculateSolution = (input) => {
  const screenWidth = 50;
  const screenHeight = 6;
  const screen = [];
  for (let y = 0; y < screenHeight; y++) {
    const row = [];
    for (let x = 0; x < screenWidth; x++) {
      row.push(" ");
    }
    screen.push(row);
  }

  for (const action of input) {
    switch (action.type) {
      case "rotate":
        rotate(action, screen);
        break;
      case "rect":
        rect(action, screen);
        break;
    }
  }

  return screen.reduce((acc, curr) => `${acc + curr.join("")}\r\n`, "");
};

const rotate = (action, screen) => {
  if (action.col !== undefined) {
    const oldCol = [...screen.map((row) => row[action.col])];

    for (let x = 0; x < screen.length; x++) {
      screen[(x + action.amount) % screen.length][action.col] = oldCol[x];
    }
  } else {
    const oldRow = [...screen[action.row]];
    const width = screen[action.row].length;
    for (let x = 0; x < width; x++) {
      screen[action.row][(x + action.amount) % width] = oldRow[x];
    }
  }
};

const rect = (action, screen) => {
  for (let y = 0; y < action.y; y++) {
    for (let x = 0; x < action.x; x++) {
      screen[y][x] = "#";
    }
  }
};

export default solution;

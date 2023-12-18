const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    const [_dir, _dist, color] = row.split(" ");
    const dirStr = color.substring(7, 8);
    const distStr = color.substring(2, 7);
    const dist = Number.parseInt(distStr, 16);
    let dir;
    switch (dirStr) {
      case "0":
        dir = "R";
        break;
      case "1":
        dir = "D";
        break;
      case "2":
        dir = "L";
        break;
      case "3":
        dir = "U";
        break;
    }
    return { dir, dist };
  });
  // return input.split("\n").map((row) => {
  //   const [dir, dist, color] = row.split(" ");
  //   return { dir, dist: +dist, color };
  // });
};

const dirs = { L: [0, -1], R: [0, 1], U: [-1, 0], D: [1, 0] };

const calculateSolution = (input) => {
  let current = [0, 0];
  const outline = [];
  for (const row of input) {
    const direction = dirs[row.dir];
    const { dist } = row;
    const next = [direction[0] * dist + current[0], direction[1] * dist + current[1]];
    outline.push({ start: current, end: next });
    current = next;
  }

  const yValues = outline.flatMap((val) => [val.start[0], val.end[0]]);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  let area = 0;
  for (let y = minY; y <= maxY; y++) {
    let state = State.OUTSIDE;
    const intersections = getLinesInRow(outline, y);
    let prevHorz = false;
    for (let lineIndex = 0; lineIndex < intersections.length; lineIndex++) {
      const line = intersections[lineIndex];
      if (isHorizontal(line)) {
        area += Math.abs(line.start[1] - line.end[1]);
        prevHorz = true;
      } else {
        if (state) {
          const prev = intersections[lineIndex - 1];
          area += Math.max(line.start[1] - Math.max(prev.start[1], prev.end[1]) - 1, 0);
        }
        if (prevHorz) {
          const lastVertical = intersections[lineIndex - 2];
          const lastHeight = Math.abs(lastVertical.start[0] - lastVertical.end[0]);
          const currentHeight = Math.abs(line.start[0] - line.end[0]);
          const totalHeight =
            Math.max(lastVertical.start[0], lastVertical.end[0], line.start[0], line.end[0]) -
            Math.min(lastVertical.start[0], lastVertical.end[0], line.start[0], line.end[0]);
          if (totalHeight !== lastHeight + currentHeight) {
            state = !state;
          }
        } else {
          area += 1;
          state = !state;
        }
        prevHorz = false;
      }
    }
  }
  return area;
};

const getLinesInRow = (outline, y) => {
  return outline
    .filter(
      (line) => (y >= line.start[0] && y <= line.end[0]) || (y <= line.start[0] && y >= line.end[0])
    )
    .sort(
      (left, right) =>
        Math.max(left.start[1], left.end[1]) - Math.max(right.start[1], right.end[1]) ||
        (isHorizontal(left) ? 0 : 1) - (isHorizontal(right) ? 0 : 1)
    );
};

const isHorizontal = (line) => {
  return line.start[0] === line.end[0];
};

const State = { OUTSIDE: false, INSIDE: true };

export default solution;

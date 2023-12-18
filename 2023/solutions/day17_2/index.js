// eslint-disable-next-line import/extensions
import { millisToHours } from "../../DateUtil.js";

const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const parseInput = (input) => {
  const unvisited = new Set();
  const grid = input.split("\n").map((row, y) =>
    row.split("").map((val, x) => {
      const node = {
        coords: [y, x],
        loss: +val,
        candidates: {
          [directions[0]]: [
            { count: 4, dist: Infinity, coords: [y, x], fromDir: directions[0] },
            { count: 5, dist: Infinity, coords: [y, x], fromDir: directions[0] },
            { count: 6, dist: Infinity, coords: [y, x], fromDir: directions[0] },
            { count: 7, dist: Infinity, coords: [y, x], fromDir: directions[0] },
            { count: 8, dist: Infinity, coords: [y, x], fromDir: directions[0] },
            { count: 9, dist: Infinity, coords: [y, x], fromDir: directions[0] },
            { count: 10, dist: Infinity, coords: [y, x], fromDir: directions[0] },
          ],
          [directions[1]]: [
            { count: 4, dist: Infinity, coords: [y, x], fromDir: directions[1] },
            { count: 5, dist: Infinity, coords: [y, x], fromDir: directions[1] },
            { count: 6, dist: Infinity, coords: [y, x], fromDir: directions[1] },
            { count: 7, dist: Infinity, coords: [y, x], fromDir: directions[1] },
            { count: 8, dist: Infinity, coords: [y, x], fromDir: directions[1] },
            { count: 9, dist: Infinity, coords: [y, x], fromDir: directions[1] },
            { count: 10, dist: Infinity, coords: [y, x], fromDir: directions[1] },
          ],
          [directions[2]]: [
            { count: 4, dist: Infinity, coords: [y, x], fromDir: directions[2] },
            { count: 5, dist: Infinity, coords: [y, x], fromDir: directions[2] },
            { count: 6, dist: Infinity, coords: [y, x], fromDir: directions[2] },
            { count: 7, dist: Infinity, coords: [y, x], fromDir: directions[2] },
            { count: 8, dist: Infinity, coords: [y, x], fromDir: directions[2] },
            { count: 9, dist: Infinity, coords: [y, x], fromDir: directions[2] },
            { count: 10, dist: Infinity, coords: [y, x], fromDir: directions[2] },
          ],
          [directions[3]]: [
            { count: 4, dist: Infinity, coords: [y, x], fromDir: directions[3] },
            { count: 5, dist: Infinity, coords: [y, x], fromDir: directions[3] },
            { count: 6, dist: Infinity, coords: [y, x], fromDir: directions[3] },
            { count: 7, dist: Infinity, coords: [y, x], fromDir: directions[3] },
            { count: 8, dist: Infinity, coords: [y, x], fromDir: directions[3] },
            { count: 9, dist: Infinity, coords: [y, x], fromDir: directions[3] },
            { count: 10, dist: Infinity, coords: [y, x], fromDir: directions[3] },
          ],
        },
      };
      for (const values of Object.values(node.candidates)) {
        for (const candidate of values) {
          unvisited.add(candidate);
        }
      }
      return node;
    })
  );
  return { grid, unvisited };
};

const calculateSolution = (input) => {
  const { grid, unvisited } = input;
  const visited = new Set();
  const nonInfinite = new Set();
  const initialCandidate = { count: 10, dist: 0, coords: [0, 0], fromDir: directions[0] };
  const initialCandidate2 = { count: 10, dist: 0, coords: [0, 0], fromDir: directions[1] };
  grid[0][0].candidates = {
    [directions[0]]: [initialCandidate],
    [directions[1]]: initialCandidate2,
  };

  nonInfinite.add(initialCandidate);
  nonInfinite.add(initialCandidate2);
  const start = new Date().getTime();
  const startingNumber = unvisited.size;
  while (nonInfinite.size > 0) {
    if (unvisited.size % 5000 === 0) {
      const currentTime = new Date();
      console.log(
        `${millisToHours(currentTime - start)}: Unvisited remaning: ${
          unvisited.size
        }/${startingNumber}: ${((unvisited.size * 100) / startingNumber).toFixed(2)}%`
      );
    }
    const sortedUnvisited = [...nonInfinite].sort((left, right) => {
      return left.dist - right.dist;
    });
    const current = sortedUnvisited[0];
    for (const direction of directions) {
      if (direction[0] === -current.fromDir[0] && direction[1] === -current.fromDir[1]) {
        continue;
      }
      let multiplier = 1;
      let loss = 0;
      if (direction !== current.fromDir) {
        multiplier = 4;
        loss +=
          grid[direction[0] + current.coords[0]]?.[direction[1] + current.coords[1]]?.loss || 0;
        loss +=
          grid[direction[0] * 2 + current.coords[0]]?.[direction[1] * 2 + current.coords[1]]
            ?.loss || 0;
        loss +=
          grid[direction[0] * 3 + current.coords[0]]?.[direction[1] * 3 + current.coords[1]]
            ?.loss || 0;
      }
      const target = [
        direction[0] * multiplier + current.coords[0],
        direction[1] * multiplier + current.coords[1],
      ];
      if (
        target[0] >= 0 &&
        target[0] < grid.length &&
        target[1] >= 0 &&
        target[1] < grid[0].length
      ) {
        const targetNode = grid[target[0]][target[1]];
        if (targetNode === grid[0][0]) {
          continue;
        }
        const count = current.fromDir === direction ? current.count + 1 : 4;
        for (const targetCandidate of targetNode.candidates[direction]) {
          if (
            !visited.has(targetCandidate) &&
            !contains(current, targetCandidate.coords) &&
            targetCandidate.count === count &&
            targetCandidate.dist > current.dist + targetNode.loss + loss
          ) {
            targetCandidate.dist = current.dist + targetNode.loss + loss;
            targetCandidate.from = current;
            nonInfinite.add(targetCandidate);
          }
        }
      }
    }
    visited.add(current);
    unvisited.delete(current);
    nonInfinite.delete(current);
  }
  return Math.min(
    ...Object.values(grid[grid.length - 1][grid[0].length - 1].candidates).flatMap((candidates) =>
      candidates.map((val) => val.dist)
    )
  );
};

const contains = (candidate, coords) => {
  let next = candidate;
  while (next) {
    if (next.coords[0] === coords[0] && next.coords[1] === coords[1]) {
      return true;
    }
    next = next.from;
  }
  return false;
};

export default solution;

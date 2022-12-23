const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) =>
  input
    .split("\n")
    .map((row) =>
      row.match(
        /Valve ([A-Z]{2}) has flow rate=([0-9]+); tunnel(?:s)? lead(?:s)? to valve(?:s)? ([A-Z]{2}(?:, [A-Z]{2})*)/
      )
    )
    .map((match) => ({
      name: match[1],
      rate: parseInt(match[2]),
      neighbors: match[3].split(", ").sort(),
    }))
    .reduce((acc, { name, ...rest }) => {
      acc[name] = { ...rest };
      return acc;
    }, {});

const calculateSolution = (input) => {
  const state = {
    pressureRelieved: 0,
    currentRoom: "AA",
    rooms: {},
    minutesRemaining: 30,
  };
  for (const room in input) {
    state.rooms[room] = { on: false, score: 0, name: room };
    input[room].shortestPaths = {};
    for (const destRoom in input) {
      if (room === destRoom) continue;
      input[room].shortestPaths[destRoom] = shortestPath(input, room, destRoom, {}, []);
    }
  }
  return makeMove(input, state);
};

const shortestPath = (input, start, end, memo, path) => {
  if (input[start].neighbors.includes(end)) {
    memo[`${start}-${end}`] = 1;
    return 1;
  }
  if (!memo[`${start}-${end}`]) {
    path.push(start);
    let minDist = Infinity;
    for (const neighbor of input[start].neighbors) {
      if (path.includes(neighbor)) continue;
      minDist = Math.min(minDist, 1 + shortestPath(input, neighbor, end, memo, path));
    }
    if (minDist === Infinity) {
      path.pop();
      return Infinity;
    }
    memo[`${start}-${end}`] = minDist;
    path.pop();
  }
  return memo[`${start}-${end}`];
};

const makeMove = (roomData, state) => {
  for (const room of Object.values(state.rooms)) {
    room.score = calculateScoreGain(roomData, state, room);
  }
  const rooms = Object.values(state.rooms).sort((a, b) => b.score - a.score);

  let maxScore = state.pressureRelieved;

  for (const room of rooms) {
    if (room.score === 0) {
      continue;
    }
    const nextState = {
      ...state,
      rooms: {
        ...Object.keys(state.rooms).reduce((rooms, roomId) => {
          rooms[roomId] = {
            ...state.rooms[roomId],
          };
          return rooms;
        }, {}),
      },
    };
    const timePassing = Math.min(
      roomData[state.currentRoom].shortestPaths[room.name] + 1,
      state.minutesRemaining
    );
    nextState.pressureRelieved += room.score;
    nextState.minutesRemaining -= timePassing;
    nextState.currentRoom = room.name;
    nextState.rooms[room.name].on = true;
    if (nextState.minutesRemaining > 0) {
      maxScore = Math.max(maxScore, makeMove(roomData, nextState));
    } else {
      maxScore = Math.max(maxScore, nextState.pressureRelieved);
    }
  }
  return maxScore;
};

const calculateScoreGain = (roomData, state, room) => {
  if (room.on || roomData[room.name].rate === 0) {
    return 0;
  }
  return (
    (state.minutesRemaining - roomData[state.currentRoom].shortestPaths[room.name] - 1) *
    roomData[room.name].rate
  );
};

export default solution;

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
    meRoom: "AA",
    rooms: {},
    minutesRemaining: 26,
    meIdleTime: 0,
    elephantRoom: "AA",
    elephantIdleTime: 0,
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
  if (state.meIdleTime > 0 && state.elephantIdleTime > 0) {
    const timeToPass = Math.min(state.meIdleTime, state.elephantIdleTime);
    state.meIdleTime -= timeToPass;
    state.elephantIdleTime -= timeToPass;
    state.minutesRemaining -= timeToPass;
  }

  for (const room of Object.values(state.rooms)) {
    room.meScore = calculateScoreGain(roomData, state, room, state.meRoom);
    room.elephantScore = calculateScoreGain(roomData, state, room, state.elephantRoom);
  }
  const rooms = Object.values(state.rooms).sort((a, b) => b.meScore - a.meScore);

  let maxScore = state.pressureRelieved;

  if (state.meIdleTime === 0) {
    for (const room of rooms.filter((room) => room.meScore > 0)) {
      if (state.minutesRemaining === 26) {
        console.log(
          `Trying room ${room.name} of ${JSON.stringify(
            rooms.filter((room) => room.meScore > 0).map((filterRoom) => filterRoom.name)
          )}`
        );
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
      const meIdleTime = Math.min(
        roomData[state.meRoom].shortestPaths[room.name] + 1,
        state.minutesRemaining
      );
      nextState.pressureRelieved += room.meScore;
      nextState.meRoom = room.name;
      nextState.meIdleTime = meIdleTime;
      nextState.rooms[room.name].on = true;
      if (nextState.minutesRemaining > 0) {
        maxScore = Math.max(maxScore, makeMove(roomData, nextState));
      } else {
        maxScore = Math.max(maxScore, nextState.pressureRelieved);
      }
    }
  } else {
    for (const room of rooms.filter((room) => room.elephantScore > 0)) {
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
      const elephantIdleTime = Math.min(
        roomData[state.elephantRoom].shortestPaths[room.name] + 1,
        state.minutesRemaining
      );
      nextState.pressureRelieved += room.elephantScore;
      nextState.elephantRoom = room.name;
      nextState.rooms[room.name].on = true;
      nextState.elephantIdleTime = elephantIdleTime;
      if (nextState.minutesRemaining > 0) {
        maxScore = Math.max(maxScore, makeMove(roomData, nextState));
      } else {
        maxScore = Math.max(maxScore, nextState.pressureRelieved);
      }
    }
  }
  return maxScore;
};

const calculateScoreGain = (roomData, state, room, currentRoom) => {
  if (room.on || roomData[room.name].rate === 0) {
    return 0;
  }
  return (
    (state.minutesRemaining - roomData[currentRoom].shortestPaths[room.name] - 1) *
    roomData[room.name].rate
  );
};

export default solution;

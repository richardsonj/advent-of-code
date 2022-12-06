const day14_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  const [start, seq] = input.split("\r\n\r\n");
  const insert = seq.split("\r\n");
  const seqMap = insert.reduce((acc, curr) => {
    let parts = curr.split(" -> ");
    acc[parts[0]] = parts[1];
    return acc;
  }, {});
  return [start, seqMap];
};

const calculateSolution = (parsedInput) => {
  let result = parsedInput[0];
  for (let x = 0; x < 10; x++) {
    result = expand(result, parsedInput[1]);
  }

  let chrMap = {}
  for (let chr of result){
    if (!Object.keys(chrMap).includes(chr))
    {
      chrMap[chr] = 0;
    }
    chrMap[chr]++;
  }
  return Math.max(...Object.values(chrMap)) - Math.min(...Object.values(chrMap));
};

const expand = (start, rules) => {
  let result = start[0];
  for (let x = 0; x < start.length-1; x++) {
    result += rules[start[x] + start[x+1]];
    result += start[x+1];
  }
  return result
}

export default day14_1;

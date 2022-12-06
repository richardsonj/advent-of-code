const day14_2 = {
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
  let fullResult = parsedInput[0];
  let halfExpanded = {};

  let charCounts = {};
  let fullCharCounts = {};

  for (let rule of Object.keys(parsedInput[1])) {
    let result = rule;
    for (let x = 0; x < 20; x++) {
      result = expand(result, parsedInput[1]);
    }
    charCounts[rule] = countChars(result);
    halfExpanded[rule] = result;
  }

  console.log(charCounts);

  for (let x = 0; x < fullResult.length - 1; x++) {
    let result = fullResult.slice(x, x + 2);
    let expandedString = halfExpanded[result];
    for (let y = 0; y < expandedString.length - 1; y++) {
      let bigResult = expandedString.slice(y, y+2);
      for (let count in charCounts[bigResult]){
        if (fullCharCounts[count] === undefined) {
          fullCharCounts[count] = 0;
        }
        fullCharCounts[count] += charCounts[bigResult][count];
      }
    }
  }

  fullCharCounts[fullResult.slice(-1, fullResult.length)] += 1;

  console.log(fullCharCounts);

  // for (let x = 0; x < fullResult.length - 2; x++) {
  //   let result = fullResult.slice(x, x + 2);
  //   let bigResult = result;
  //   if (!Object.keys(halfExpanded).includes(result)) {
  //     for (let y = 0; y < 5; y++) {
  //       bigResult = expand(bigResult, parsedInput[1]);
  //     }
  //     halfExpanded[result] = bigResult;
  //   }
  // }

  // let halfExpandedKeys = Object.keys(halfExpanded);
  // for (let x = 0; x < fullResult.length - 2; x++) {
  //   let result = fullResult.slice(x, x + 2);
  //   let bigResult = halfExpanded[result];
  //   for (let y = 0; y < bigResult.length - 2; y++) {
  //     let bigBigResult = bigResult.slice(y, y + 2);
  //     let temp = bigBigResult;
  //     if (!halfExpandedKeys.includes(bigBigResult)) {
  //       for (let z = 0; z < 5; z++) {
  //         temp = expand(temp, parsedInput[1]);
  //       }
  //       halfExpanded[bigBigResult] = temp;
  //       halfExpandedKeys = Object.keys(halfExpanded);
  //     } else {
  //       temp = halfExpanded[bigBigResult];
  //     }
  //     for (let chr of temp.slice(0, -1)) {
  //       if (!Object.keys(chrMap).includes(chr)) {
  //         chrMap[chr] = 0;
  //       }
  //       chrMap[chr]++;
  //     }
  //     console.log(`x: ${x} of ${fullResult.length - 2}`);
  //     console.log(`y: ${y} of ${bigResult.length - 2}`);
  //     console.log(chrMap);
  //   }
  // }

   return (
     Math.max(...Object.values(fullCharCounts)) - Math.min(...Object.values(fullCharCounts))
   );
};

const expand = (start, rules) => {
  let result = start[0];
  for (let x = 0; x < start.length - 1; x++) {
    result += rules[start[x] + start[x + 1]];
    result += start[x + 1];
  }
  return result;
};

const countChars = (input) => {
  const charMap = {};
  for (let chr of input.slice(0, -1)) {
    if (charMap[chr] === undefined) {
      charMap[chr] = 0;
    }
    charMap[chr]++;
  }
  return charMap;
};

export default day14_2;

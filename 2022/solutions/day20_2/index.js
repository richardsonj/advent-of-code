const solution = {
  solve: (input) => calculateSolution(parseInput(input)),
};

const parseInput = (input) =>
  input.split("\n").map((val, index) => ({ index, value: parseInt(val) * 811589153 }));

const calculateSolution = (input) => {
  for (let x = 0; x < 10; x++) {
    mixArray(input);
  }
  const zeroValue = input.find((val) => val.value === 0);
  const zeroOffset = input.indexOf(zeroValue);
  return (
    input[(zeroOffset + 1000) % input.length].value +
    input[(zeroOffset + 2000) % input.length].value +
    input[(zeroOffset + 3000) % input.length].value
  );
};

export default solution;
function mixArray(input) {
  for (let targetIndex = 0; targetIndex < input.length; targetIndex++) {
    const targetValue = input.find((obj) => obj.index === targetIndex);
    const startingIndex = input.indexOf(targetValue);
    const x = (targetValue.value + 3 * (input.length - 1)) % (input.length - 1);

    for (let y = 0; x < 0 ? y > x : y < x; y = x < 0 ? y - 1 : y + 1) {
      const index1 = (startingIndex + y + 3 * input.length) % input.length;
      const temp = input[index1];
      const index2 = ((x < 0 ? index1 - 1 : index1 + 1) + input.length) % input.length;
      input[index1] = input[index2];
      input[index2] = temp;
    }
  }
}

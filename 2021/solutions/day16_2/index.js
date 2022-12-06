const day16_2 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  let binary = "";
  for (let chr of input) {
    binary += parseInt(chr, 16).toString(2).padStart(4, "0");
  }
  return binary.split("");
};

const calculateSolution = (binary) => {
  let total = 0;
  let version = parsePacket(binary);
  total += version;

  return version;
};

const parseNumber = (bits, count) => {
  let numberBits = bits.splice(0, count);
  let number = parseInt(numberBits.join(""), 2);
  return number;
};

const parseLiteral = (bits) => {
  let result = "";
  let numberBits;
  let firstBit;
  do {
    numberBits = bits.splice(0, 5);
    firstBit = numberBits.splice(0, 1);
    result += numberBits.join("");
  } while (firstBit[0] === "1");

  return parseInt(result, 2);
};

const parseOperator = (bits) => {
  let lengthTypeId = bits.splice(0, 1)[0];
  let values = [];
  if (lengthTypeId === "0") {
    let length = parseInt(bits.splice(0, 15).join(""), 2);
    let targetBitCount = bits.length - length;
    while (bits.length > targetBitCount) {
      let value = parsePacket(bits);
      values.push(value);
    }
  } else {
    let subPacketCount = parseInt(bits.splice(0, 11).join(""), 2);
    for (let x = 0; x < subPacketCount; x++) {
      let value = parsePacket(bits);
      values.push(value);
    }
  }
  return values;
};

function parsePacket(binary) {
  let version = parseNumber(binary, 3);
  let type = parseNumber(binary, 3);
  let value;
  let left;
  let right;
  switch (type) {
    case 0:
      value = parseOperator(binary).reduce((a, b) => a + b);
      break;
    case 1:
      value = parseOperator(binary).reduce((a, b) => a * b);
      break;
    case 2:
      value = Math.min(...parseOperator(binary));
      break;
    case 3:
      value = Math.max(...parseOperator(binary));
      break;
    case 4:
      value = parseLiteral(binary);
      break;
    case 5:
      [left, right] = parseOperator(binary);
      value = left > right ? 1 : 0;
      break;
    case 6:
      [left, right] = parseOperator(binary);
      value = left < right ? 1 : 0;
      break;
    case 7:
      [left, right] = parseOperator(binary);
      value = left === right ? 1 : 0;
      break;
  }
  return value;
}

export default day16_2;

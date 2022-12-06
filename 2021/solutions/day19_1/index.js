import { matrix, identity, multiply, subtract, add } from "mathjs";

const day19_1 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const rotations = {
  x: matrix([
    [1, 0, 0],
    [0, 0, -1],
    [0, 1, 0],
  ]),
  y: matrix([
    [0, 0, 1],
    [0, 1, 0],
    [-1, 0, 0],
  ]),
  z: matrix([
    [0, -1, 0],
    [1, 0, 0],
    [0, 0, 1],
  ]),
};

const doubleRotations = {
  x: multiply(rotations.x, rotations.x),
  y: multiply(rotations.y, rotations.y),
  z: multiply(rotations.z, rotations.z),
};
const tripleRotations = {
  x: multiply(doubleRotations.x, rotations.x),
  y: multiply(doubleRotations.y, rotations.y),
  z: multiply(doubleRotations.z, rotations.z),
};

const rotationSequence = [
  identity(3),
  rotations.z,
  doubleRotations.z,
  tripleRotations.z,
  rotations.y,
  multiply(rotations.x, rotations.y),
  multiply(doubleRotations.x, rotations.y),
  multiply(tripleRotations.x, rotations.y),
  doubleRotations.y,
  multiply(rotations.z, doubleRotations.y),
  multiply(doubleRotations.z, doubleRotations.y),
  multiply(tripleRotations.z, doubleRotations.y),
  tripleRotations.y,
  multiply(rotations.x, tripleRotations.y),
  multiply(doubleRotations.x, tripleRotations.y),
  multiply(tripleRotations.x, tripleRotations.y),
  rotations.x,
  multiply(rotations.y, rotations.x),
  multiply(doubleRotations.y, rotations.x),
  multiply(tripleRotations.y, rotations.x),
  tripleRotations.x,
  multiply(rotations.y, tripleRotations.x),
  multiply(doubleRotations.y, tripleRotations.x),
  multiply(tripleRotations.y, tripleRotations.x),
];

const parseInput = (input) => {
  let sensors = input.split("\r\n\r\n").map((sensor) => {
    let beacons = sensor.split("\r\n");
    beacons.splice(0, 1);
    return new Sensor(
      beacons.map((beacon) => {
        return beacon.split(",").map((coord) => parseInt(coord));
      })
    );
  });

  return sensors;
};

const calculateSolution = (sensors) => {
  // let vector = [1,2,3];
  // let result = [];
  // for (let rotation of rotationSequence) {
  //   result.push(multiply(rotation, vector)._data);
  // }

  // console.log(result);

  sensors[0].fixed = true;
  let lastSensorCount;
  let unfixedSensorCount;
  do {
    lastSensorCount = sensors.filter((sensor) => !sensor.fixed).length;
    for (let sensorA of sensors) {
      for (let sensorB of sensors) {
        if (sensorA.fixed === sensorB.fixed) {
          continue;
        }
        let fixedSensor = sensorA.fixed ? sensorA : sensorB;
        let unfixedSensor = sensorA.fixed ? sensorB : sensorA;
        unfixedSensor.attemptFix(fixedSensor);
      }
    }
    unfixedSensorCount = sensors.filter((sensor) => !sensor.fixed).length;
  } while (unfixedSensorCount > 0 && lastSensorCount !== unfixedSensorCount);

  let beacons = sensors.reduce((acc, curr) => {
    acc.push(...curr.beacons);
    return acc;
  }, []);
  removeDuplicates(beacons);
  // console.log(beacons.filter(val=>val)
  //   .map((beacon) => beacon._data)
  //   .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]));
  return beacons.filter((val) => val).length;
};

const removeDuplicates = (beacons) => {
  for (let x = 0; x < beacons.length; x++) {
    for (let y = x + 1; y < beacons.length; y++) {
      if (
        beacons[x]._data[0] === beacons[y]._data[0] &&
        beacons[x]._data[1] === beacons[y]._data[1] &&
        beacons[x]._data[2] === beacons[y]._data[2]
      ) {
        delete beacons[x];
        break;
      }
    }
  }
};

class Sensor {
  constructor(beacons) {
    this.coords = [0, 0, 0];
    this.fixed = false;
    this.beacons = beacons.map((beacon) => matrix(beacon));
  }

  setCoords(coords) {
    this.coords = coords;
  }

  attemptFix(other) {
    for (let rotation of rotationSequence) {
      let rotatedBeacons = this.beacons.map((beacon) =>
        multiply(rotation, beacon)
      );
      let potentialOffsets = [];
      for (let initialBeacon of other.beacons) {
        for (let initialBeacon2 of rotatedBeacons) {
          let offset = subtract(initialBeacon, initialBeacon2);
          potentialOffsets.push(offset);
        }
      }

      removeDuplicates(potentialOffsets);

      for (let offset of potentialOffsets.filter((val) => val)) {
        let translatedBeacons = rotatedBeacons.map((beacon) =>
          add(beacon, offset)
        );
        let matches = 0;
        for (let testBeacon of other.beacons) {
          translatedBeacons.forEach((beacon) => {
            if (
              testBeacon._data[0] === beacon._data[0] &&
              testBeacon._data[1] === beacon._data[1] &&
              testBeacon._data[2] === beacon._data[2]
            ) {
              matches++;
            }
          });
        }
        if (matches >= 12) {
          this.fixed = true;
          this.beacons = translatedBeacons;
        }
      }
    }
  }
}

export default day19_1;

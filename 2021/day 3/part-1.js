const fs = require('fs');

const readings = fs.readFileSync('./input.txt', 'utf-8').split(/\n/);
// const readings = [
// '00100',
// '11110',
// '10110',
// '10111',
// '10101',
// '01111',
// '00111',
// '11100',
// '10000',
// '11001',
// '00010',
// '01010',
// ];

let gamma = 0;
let epsilon = 0;

const bitlength = readings[0].length;
const numReadings = readings.length;

for (let char = 0; char < bitlength; char++) {
  // bitshift at the beginning to avoid "overshifting" in the last round
  gamma <<= 1;
  epsilon <<= 1;
  let columnSum = readings.reduce((acc, r) => acc + parseInt(r[char], 10), 0);
  let mostCommon = Math.round(columnSum / numReadings);
  // console.log({char, columnSum, mostCommon, leastCommon: Number(!mostCommon)})
  gamma += mostCommon;
  epsilon += Number(!mostCommon);
}

// console.log({gamma, epsilon});
console.log(gamma * epsilon);
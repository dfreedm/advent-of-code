// https://adventofcode.com/2021/day/1
const fs = require('fs');

const readings = fs.readFileSync('./input.txt', 'utf-8').split(/\n/).map(s => parseInt(s));
// console.log(readings)

function countIncrease(readings) {
  let count = 0;
  for (let i = 0; i < readings.length - 1; i++) {
    if (readings[i] < readings[i+1]) {
      count++;
    }
  }
  return count;
}

console.log(countIncrease(readings));
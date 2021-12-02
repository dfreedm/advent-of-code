// https://adventofcode.com/2021/day/1#part2
const fs = require('fs');

const readings = fs.readFileSync('./input.txt', 'utf-8').split(/\n/).map(s => parseInt(s));
// const readings = [
//   103,
//   112,
//   111,
//   133,
//   132,
//   128,
//   136,
// 138,
// 133,
// 136,
// 137,
// 140,
// ]

function countIncrease(readings) {
  let count = 0;
  for (let i = 0; i < readings.length - 2; i++) {
    // console.log(readings.slice(i, i+3));
    const oldCount = readings.slice(i, i+3).reduce((arr, v) => arr + v, 0);
    // console.log(readings.slice(i+1, i+4));
    const newCount = readings.slice(i+1, i+4).reduce((arr, v) => arr + v, 0);
    // console.log({oldCount, newCount})
    if (oldCount < newCount) {
      // console.log('increase');
      count++;
    }
  }
  return count;
}

console.log(countIncrease(readings));
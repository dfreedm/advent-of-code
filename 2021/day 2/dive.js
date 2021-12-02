// https://adventofcode.com/2021/day/2
const fs = require('fs');

const directions = fs.readFileSync('./input.txt', 'utf-8').split(/\n/);
// const directions = ['forward 9',
//   'down 3',
//   'down 8']

let depth = 0;
let horiz = 0;

const regexp = /(up|down|forward) (\d+)/;

for (const direction of directions) {
  // console.log(direction);
  const [, command, unitsStr] = regexp.exec(direction);
  const units = parseInt(unitsStr, 10);
  // console.log({command, units});
  if (command === 'forward') {
    horiz += units;
  } else {
    depth += command === 'up' ? -1 * units : units;
  }
}

// console.log({depth, horiz});

console.log(depth * horiz);
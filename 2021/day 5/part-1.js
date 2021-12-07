import {readFileSync} from 'fs';
import { extractLine, createGrid } from './common.js';

const lines = readFileSync(new URL('./input.txt', import.meta.url), 'utf-8').split(/\n/);

const size = 1000;

const grid = createGrid(1000);

for (const line of lines) {
  for (const {x, y} of extractLine(line)) {
    grid[x][y]++;
  }
}

let intersectionPoints = 0;
for (let row of grid) {
  for (let cell of row) {
    if (cell >= 2) {
      intersectionPoints++;
    }
  }
}

console.log(intersectionPoints);
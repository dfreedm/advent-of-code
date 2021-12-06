import { readFileSync } from "fs";
import {Bingo} from './bingo.js';

const lines = readFileSync(
  new URL("./input.txt", import.meta.url),
  "utf-8"
).split(/\n/);

// first line is the bingo numbers, separated by commas
const bingoNumbers = lines
  .shift()
  .split(",")
  .map((n) => parseInt(n, 10));

// empty next line
lines.shift();

// find board size
const boardSize = lines.findIndex((l) => l === "");

const boards = [];

while (lines.length > 0) {
  const boardLines = lines.splice(0, boardSize);
  // console.log({boardLines});
  const board = new Bingo(boardSize, boardLines);
  boards.push(board);
  // console.log({cells: board.cells});
  // remove blank line
  lines.shift();
}

const calledNumbers = new Set();
for (const number of bingoNumbers) {
  calledNumbers.add(number);
  const winner = boards.find((b) => b.checkBingo(calledNumbers));
  if (winner) {
    console.log(winner.calculateScore(calledNumbers, number));
    break;
  }
}

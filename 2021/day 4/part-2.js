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

// console.log({boards: boards.length});

const calledNumbers = new Set();
// declare number outside the loop to use in the board calculation
let lastWinningNumber;
let lastWinningBoard;
for (const number of bingoNumbers) {
  // there are no remaining boards, exit
  if (boards.length === 0) {
    break;
  }
  // console.log({ number });
  calledNumbers.add(number);
  // there could be multiple winning boards per called number
  const newWinners = [];
  for (const [index, board] of boards.entries()) {
    if (board.checkBingo(calledNumbers)) {
      newWinners.push({ board, index });
    }
  }
  if (newWinners.length > 0) {
    lastWinningNumber = number;
    lastWinningBoard = newWinners[newWinners.length - 1].board;
    newWinners.reverse().forEach(({ index }) => boards.splice(index, 1));
  }
}

// console.log({ lastWinningBoard, lastWinningNumber });
console.log(lastWinningBoard.calculateScore(calledNumbers, lastWinningNumber));

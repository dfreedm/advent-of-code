import { readFileSync } from "fs";

class Bingo {
  constructor(size, lines) {
    this.size = size;
    this.cells = [];
    for (const line of lines) {
      /*
       * split justified line into numbers by matching against a number regex
       * and parsing the integer
       */
      const matches = [...line.matchAll(/\d+/g)].map((m) => parseInt(m[0], 10));
      this.cells.push(...matches);
    }
  }
  checkBingoByRows(calledNumbers) {
    for (let row = 0; row < this.size; row++) {
      let bingo = true;
      for (let cell = 0; cell < this.size; cell++) {
        bingo = bingo && calledNumbers.has(this.cells[row * this.size + cell]);
      }
      if (bingo) {
        return true;
      }
    }
  }
  checkBingoByColumns(calledNumbers) {
    for (let column = 0; column < this.size; column++) {
      let bingo = true;
      for (let cell = 0; cell < this.size; cell++) {
        bingo =
          bingo && calledNumbers.has(this.cells[column + cell * this.size]);
      }
      if (bingo) {
        return true;
      }
    }
  }
  checkBingo(calledNumbers) {
    return (
      this.checkBingoByColumns(calledNumbers) ||
      this.checkBingoByRows(calledNumbers)
    );
  }
  calculateScore(calledNumbers, lastNumber) {
    const unmarkedSum = this.cells
      .filter((num) => !calledNumbers.has(num))
      .reduce((acc, num) => acc + num, 0);
    return lastNumber * unmarkedSum;
  }
}

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

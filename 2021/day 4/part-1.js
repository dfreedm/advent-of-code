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

const calledNumbers = new Set();
for (const number of bingoNumbers) {
  calledNumbers.add(number);
  const winner = boards.find((b) => b.checkBingo(calledNumbers));
  if (winner) {
    console.log(winner.calculateScore(calledNumbers, number));
    break;
  }
}

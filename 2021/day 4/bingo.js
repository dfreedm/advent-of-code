export class Bingo {
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
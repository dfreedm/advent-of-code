const lineRegExp = /(\d+),(\d+)\s+->\s+(\d+),(\d+)/;

export function* extractLine(line, allowDiagonal = false) {
  const [, x1, y1, x2, y2] = lineRegExp.exec(line);
  let [xStart, yStart, xEnd, yEnd] = [x1, y1, x2, y2].map(Number);
  if (!allowDiagonal) {
    if (xStart !== xEnd && yStart !== yEnd) {
      return;
    }
  }
  let xStep = Math.sign(xEnd - xStart);
  let yStep = Math.sign(yEnd - yStart);
  while (xStart !== xEnd || yStart !== yEnd) {
    yield {x: xStart, y: yStart};
    yStart += yStep;
    xStart += xStep;
  }
  yield {x: xEnd, y: yEnd};
}

export function createGrid(size) {
  const grid = Array(size);
  for (let i = 0; i < size; i++) {
    grid[i] = Array(size).fill(0);
  }
  return grid;
}
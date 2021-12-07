import { readFileSync } from "fs";

const crabPositions = readFileSync(
  new URL("./input.txt", import.meta.url),
  "utf-8"
)
  .split(",")
  .map(Number);

const mean = Math.round(
  crabPositions.reduce((arr, c) => arr + c, 0) / crabPositions.length
);

function findMedian(positions) {
  const map = new Map();
  for (const position of positions) {
    // console.log({number});
    map.set(position, (map.get(position) ?? 0) + 1);
  }
  const mostCommonEntries = [];
  for (const entry of map.entries()) {
    const largest = mostCommonEntries[0]?.[1] ?? -Infinity;
    // console.log({largest, entry});
    if (entry[1] > largest) {
      mostCommonEntries.length = 0;
      mostCommonEntries.push(entry);
    } else if (entry[1] === largest) {
      mostCommonEntries.push(entry);
    }
  }
  return (
    mostCommonEntries.reduce((arr, v) => arr + v[0], 0) /
    mostCommonEntries.length
  );
}

const median = findMedian(crabPositions);

const startPosition = Math.min(mean, median);
const endPosition = Math.max(mean, median);

// search between the median and the mean, looking for the minimum usage
let minFuelUsage = Infinity;
for (let i = startPosition; i <= endPosition; i++) {
  const fuelToPosition = crabPositions.reduce(
    (arr, p) => arr + Math.abs(i - p),
    0
  );
  minFuelUsage = Math.min(minFuelUsage, fuelToPosition);
}

console.log(minFuelUsage);

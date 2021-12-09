import { readData } from "./common.js";

const dataLines = readData("./input.txt");

// 5 segment number missing the same segment from 4 and 1 is 2

// sort the segments alphabetically to do an easier comparison
function sortSegments(segments) {
  return segments.split("").sort().join("");
}

function diffCount(unknown, known) {
  const unknownSet = new Set(unknown.split(""));
  const knownSet = new Set(known.split(""));
  let count = 0;
  for (const known of knownSet) {
    if (!unknownSet.has(known)) {
      count++;
    }
  }
  return count;
}

let summation = 0;
for (let [signals, digits] of dataLines) {
  signals = signals.map(sortSegments);
  digits = digits.map(sortSegments);
  let eight, one, seven, four;
  // find the known ones
  // 2 segments: 1
  // 3 segments: 7
  // 4 segments: 4
  // 5 segments: 2, 3, 5
  // 6 segments: 0, 6, 9
  // 7 segments: 8
  for (const signal of signals) {
    if (signal.length === 7) {
      eight = signal;
    }
    if (signal.length === 2) {
      one = signal;
    }
    if (signal.length === 3) {
      seven = signal;
    }
    if (signal.length === 4) {
      four = signal;
    }
  }
  const fives = signals.filter((signal) => signal.length === 5);
  const sixes = signals.filter((signal) => signal.length === 6);

  
  // 2 is missing two segments from 4
  const two = fives.find(s => diffCount(s, four) === 2 );

  // three has all segments of one
  const three = fives.find(s => diffCount(s, one) === 0);

  // five is the last one
  const five = fives.find((s) => s !== three && s !== two);

  // 6 is missing one segment from
  const six = sixes.find((s) => diffCount(s, one) === 1);

  // 0 is missing one of the segments from 4 and isn't 6
  const zero = sixes.find((s) => s !== six && diffCount(s, four) === 1);

  // the last 6 segment number is 9
  const nine = sixes.find((s) => s !== six && s !== zero);

  const digitMap = new Map([
    [zero, 0],
    [one, 1],
    [two, 2],
    [three, 3],
    [four, 4],
    [five, 5],
    [six, 6],
    [seven, 7],
    [eight, 8],
    [nine, 9],
  ]);
  // console.log({ digitMap });

  for (const [i, digit] of digits.entries()) {
    // console.log({digit});
    summation += (digitMap.get(digit) * 10**(3 - i));
  }
}

console.log(summation);
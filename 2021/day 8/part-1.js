import { readData } from "./common.js";

const digitLines = readData("./input.txt").map((dl) => dl[1]);

console.log(
  digitLines.reduce(
    (acc, digits) =>
      acc + digits.reduce((acc, digit) => {
        if (
          digit.length === 2 ||
          digit.length === 3 ||
          digit.length === 4 ||
          digit.length === 7
        ) {
          acc++;
        }
        return acc;
      }, 0),
    0
  )
);

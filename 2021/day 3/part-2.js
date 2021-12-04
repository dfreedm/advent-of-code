const fs = require('fs');

const readings = fs.readFileSync('./input.txt', 'utf-8').split(/\n/);
// const readings = [
// '00100',
// '11110',
// '10110',
// '10111',
// '10101',
// '01111',
// '00111',
// '11100',
// '10000',
// '11001',
// '00010',
// '01010',
// ];

const bitlength = readings[0].length;

function winnowCandidates(candidates, popular = true) {
  let current = [...candidates];
  for (let char = 0; char < bitlength; char++) {
    if (current.length === 1) {
      break;
    }
    let columnSum = current.reduce((acc, r) => acc + parseInt(r[char], 2), 0); 
    let mostPopular = Math.round(columnSum / current.length);
    if (popular) {
      filterBit = String(mostPopular);
    } else {
      filterBit = String(Number(!mostPopular));
    }
    // reduce current set to numbers that have the correct bit at the index
    current = current.filter(c => c[char] === filterBit);
  }
  return parseInt(current[0], 2);
}

const oxygenNumber = winnowCandidates([...readings]);
const co2Number = winnowCandidates([...readings], false);

console.log(oxygenNumber * co2Number)